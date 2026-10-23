"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "cn"

export type InkDraw = "view" | "hover" | "static"

type InkSvgProps = {
  paths: string[]
  width: number
  height: number
  draw: InkDraw
  /** seconds to wait before a `view` draw starts */
  delay?: number
  bold?: boolean
  className?: string
}

// pathLength={1} makes the dash maths length-independent.
const hidden = "[stroke-dasharray:1_2] [stroke-dashoffset:1.001]"
const shown = "[stroke-dashoffset:0]"

const drawStyles = {
  // drawn in once scrolled into view; fully drawn with reduced motion
  view: cn(
    hidden,
    "ease-pen transition-[stroke-dashoffset] duration-200",
    "motion-reduce:[stroke-dasharray:none] motion-reduce:[stroke-dashoffset:0]"
  ),

  // drawn while the parent `.group` is hovered, focused or aria-current
  hover: cn(
    hidden,
    "ease-pen transition-[stroke-dashoffset] duration-200 motion-reduce:transition-none",
    "group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] group-aria-[current]:[stroke-dashoffset:0]"
  ),
  static: "",
}

export const InkSvg = ({
  paths,
  width,
  height,
  draw,
  delay = 0,
  bold,
  className,
}: InkSvgProps) => {
  const [ref, inView] = useInView<SVGSVGElement>(draw === "view")

  return (
    <svg
      ref={ref}
      aria-hidden
      focusable={false}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("pointer-events-none overflow-visible", className)}
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          style={{
            transitionDelay:
              draw === "view" ? `${delay * 1000 + i * 110}ms` : undefined,
          }}
          className={cn(
            "stroke-mark",
            bold ? "stroke-[3.5px]" : "stroke-[2.5px]",
            drawStyles[draw],
            draw === "view" && inView && shown
          )}
        />
      ))}
    </svg>
  )
}
