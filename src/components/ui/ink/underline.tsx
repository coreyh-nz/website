"use client"

import { useElementSize } from "@/hooks/use-element-size"
import { underline } from "@/lib/ink"
import { cn } from "cn"
import { useMemo } from "react"
import { InkSvg, type InkDraw } from "./ink-svg"

type UnderlineProps = {
  children: string
  seed?: string
  draw?: InkDraw
  /** seconds to wait before a `view` draw starts */
  delay?: number
  weight?: "normal" | "bold"
}

export const Underline = ({
  children,
  seed = children,
  draw = "view",
  delay,
  weight = "normal",
}: UnderlineProps) => {
  const [ref, { width }] = useElementSize<HTMLSpanElement>()
  const path = useMemo(
    () => (width ? underline(width, { seed }) : null),
    [width, seed]
  )

  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap">
      {children}
      {path && (
        <InkSvg
          paths={[path]}
          width={width}
          height={12}
          draw={draw}
          delay={delay}
          bold={weight === "bold"}
          className={cn(
            "absolute left-0",
            weight === "bold" ? "bottom-[-0.1em]" : "bottom-[-0.3em]"
          )}
        />
      )}
    </span>
  )
}
