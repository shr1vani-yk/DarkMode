import Image from "next/image";
import { PlixAsset } from "../data";

export interface PlixFigureProps {
  asset: PlixAsset;
  sizes: string;
  priority?: boolean;
  hasLightEdgeShadow?: boolean;
  className?: string;
}

/**
 * Renders a supplied Plix showcase asset at its exact intrinsic aspect ratio
 * to eliminate layout shift (CLS = 0) while preserving rounded alpha corners.
 */
export function PlixFigure({
  asset,
  sizes,
  priority = false,
  hasLightEdgeShadow = false,
  className = "",
}: PlixFigureProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl lg:rounded-[30px] ${className}`}
      style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={`w-full h-auto block object-cover ${
          hasLightEdgeShadow
            ? "drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)] dark:drop-shadow-none"
            : ""
        }`}
      />
    </div>
  );
}
