import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { ComponentProps } from "react"

const containerVariants = cva("relative mx-auto w-full", {
  variants: {
    size: {
      wide: "max-w-7xl",
      narrow: "max-w-3xl",
    },
    padding: {
      true: "px-4 sm:px-8 lg:px-16",
      false: "px-0",
    },
  },
  defaultVariants: {
    size: "wide",
    padding: false,
  },
})

export const Container = ({
  size,
  padding,
  className,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof containerVariants>) => {
  return (
    <div
      className={cn(containerVariants({ size, padding, className }))}
      {...props}
    />
  )
}
