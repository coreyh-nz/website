import { cn } from "cn"
import type { ComponentProps, CSSProperties } from "react"

export const Grid = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "gap-x-gutter grid grid-cols-1 gap-y-12 md:grid-cols-12",
        className
      )}
      {...props}
    />
  )
}

type GridColProps = ComponentProps<"div"> & {
  span?: number
  start?: number
}

export const GridCol = ({
  span = 12,
  start,
  className,
  ...props
}: GridColProps) => {
  return (
    <div
      className={cn("md:col-(--col)", className)}
      style={
        {
          "--col": `${start ?? "auto"} / span ${span}`,
        } as CSSProperties
      }
      {...props}
    />
  )
}
