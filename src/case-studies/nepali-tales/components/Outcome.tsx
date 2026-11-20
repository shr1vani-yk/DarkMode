"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import * as PhosphorIcons from "@phosphor-icons/react/ssr";
import { NEPALI_TALES_METADATA } from "../data";

const OUTCOME_STATS = [
  {
    value: "450+",
    label: "Monthly Orders",
    description: "Reduced WhatsApp Dropoff",
  },
  {
    value: "3.4x",
    label: "Peak Capacity",
    description: "Handled Seamlessly",
  },
  {
    value: "80.2%",
    label: "Order Accuracy",
    description: "Up from 74%",
  },
  {
    value: "< 1.2s",
    label: "Checkout Time",
    description: "Optimized Mobile UX",
  },
];

export function Outcome() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay, loop continuously, and pause when outside viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay prevented by browser policy
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="outcome"
      aria-labelledby="heading-outcome"
      className="flex flex-col gap-8 pt-10 border-t border-border-subtle/70"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-1.5">
        <span className="font-pixel text-xs uppercase tracking-wider text-muted-foreground">
          FINAL OUTCOME
        </span>
        <h2
          id="heading-outcome"
          className="text-lg sm:text-xl font-light text-foreground leading-snug"
        >
          The platform is live and operational, bringing together a customer friendly ordering experience
        </h2>
      </div>

      {/* Compact Horizontal Stats Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-6 md:gap-8 pt-1">
        {OUTCOME_STATS.map((stat, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="font-sans text-2xl sm:text-3xl font-semibold text-foreground">
              {stat.value}
            </span>
            <span className="font-sans text-xs sm:text-sm font-medium text-foreground mt-1">
              {stat.label}
            </span>
            <p className="font-sans text-[11px] sm:text-xs text-muted-foreground font-light leading-snug mt-0.5">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* 2. Horizontal Visual Showcase: Motion Video + img-2 Visual Asset */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 items-stretch w-full">
        {/* Left: motion-1.mp4 continuous loop video (Timesaving motion brand piece) */}
        <div className="relative rounded-xl bg-[#c10014] overflow-hidden shadow-xs flex items-center justify-center aspect-square sm:aspect-[1584/1068]">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center"
            aria-label="Nepali Tales Timesaving brand motion visual"
          >
            <source
              src="/images/case-studies/NepaliTales/Outcome/motion-1.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Right: img-2.png Visual Showcase Card */}
        <div className="relative rounded-xl overflow-hidden border border-border-subtle bg-surface shadow-xs aspect-[357/194] sm:aspect-[1584/1068]">
          <Image
            src="/images/case-studies/NepaliTales/Outcome/img-2.png"
            alt="Nepali Tales digital pre-order visual showcase"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* 3. Centred Website Preview Below */}
      <div className="relative w-full max-w-[800px] mx-auto aspect-[919/512] rounded-xl overflow-hidden bg-surface shadow-xs">
        <Image
          src="/images/case-studies/NepaliTales/Outcome/img3.png"
          alt="Nepali Tales live website experience"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 800px) 100vw, 800px"
          className="object-cover object-center"
        />
      </div>

      {/* Centered Action Button */}
      <div className="flex justify-center pt-2">
        <a
          href={NEPALI_TALES_METADATA.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3 rounded-full bg-[#DA2122] hover:bg-[#b91c1c] text-white font-sans font-medium text-xs sm:text-sm transition-all duration-200 shadow-md inline-flex items-center gap-2 active:scale-95 group"
        >
          <span>View Website</span>
          <PhosphorIcons.ArrowUpRightIcon
            size={14}
            weight="bold"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </section>
  );
}

export default Outcome;
