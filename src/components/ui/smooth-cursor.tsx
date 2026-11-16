"use client"

import { useEffect, useRef, useState, type FC } from "react"
import { motion, useSpring } from "motion/react"

interface Position {
  x: number
  y: number
}

export interface SmoothCursorProps {
  cursor?: React.ReactNode
  springConfig?: {
    damping: number
    stiffness: number
    mass: number
    restDelta: number
  }
}

const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={28}
      viewBox="0 0 50 54"
      fill="none"
      className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
    >
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="#000000"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
        stroke="#ffffff"
        strokeWidth={2.5}
      />
    </svg>
  )
}

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const lastMousePos = useRef<Position>({ x: 0, y: 0 })
  const velocity = useRef<Position>({ x: 0, y: 0 })
  const lastUpdateTime = useRef(0)
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)
  const hasInitialized = useRef(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  })
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  })

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        setIsVisible(false)
        return
      }

      setIsVisible(true)

      const currentPos = { x: e.clientX, y: e.clientY }

      // Snap immediately to mouse position on first move so it does not spring from (0,0)
      if (!hasInitialized.current) {
        hasInitialized.current = true
        cursorX.jump(currentPos.x)
        cursorY.jump(currentPos.y)
        lastMousePos.current = currentPos
        lastUpdateTime.current = Date.now()
        return
      }

      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current

      if (deltaTime > 0 && lastUpdateTime.current > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }

        const speed = Math.hypot(velocity.current.x, velocity.current.y)

        if (speed > 0.1) {
          const currentAngle =
            Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
            90

          let angleDiff = currentAngle - previousAngle.current
          if (angleDiff > 180) angleDiff -= 360
          if (angleDiff < -180) angleDiff += 360
          accumulatedRotation.current += angleDiff
          rotation.set(accumulatedRotation.current)
          previousAngle.current = currentAngle

          scale.set(0.95)

          if (timeout !== null) {
            clearTimeout(timeout)
          }

          timeout = setTimeout(() => {
            scale.set(1)
          }, 150)
        }
      }

      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos

      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)
    }

    const handlePointerLeave = () => {
      setIsVisible(false)
    }

    const handlePointerEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerdown", handlePointerMove, { passive: true })
    document.addEventListener("mouseleave", handlePointerLeave)
    document.addEventListener("mouseenter", handlePointerEnter)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerMove)
      document.removeEventListener("mouseleave", handlePointerLeave)
      document.removeEventListener("mouseenter", handlePointerEnter)
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    }
  }, [cursorX, cursorY, rotation, scale])

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: cursorX,
        y: cursorY,
        zIndex: 99999,
        pointerEvents: "none",
        willChange: "transform",
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.12,
      }}
    >
      <motion.div
        style={{
          translateX: "-50%",
          translateY: "-50%",
          rotate: rotation,
          scale: scale,
        }}
      >
        {cursor}
      </motion.div>
    </motion.div>
  )
}

