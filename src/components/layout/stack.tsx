import { cva, VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { ComponentProps, ElementType } from "react"

const stackVariants = cva("flex", {
  variants: {
    gap: {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
    align: {
      start: "items-start",
      center: "items-center",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    gap: "sm",
    direction: "vertical",
    wrap: false,
  },
})

type StackProps = ComponentProps<"div"> &
  VariantProps<typeof stackVariants> & { as?: ElementType }

type DirectionalStackProps = Omit<StackProps, "direction">

const Stack = ({
  as: Component = "div",
  gap,
  direction,
  wrap,
  align,
  className,
  ...props
}: StackProps) => {
  return (
    <Component
      className={cn(stackVariants({ gap, direction, wrap, align, className }))}
      {...props}
    />
  )
}

export const VStack = (props: DirectionalStackProps) => {
  return <Stack {...props} direction="vertical" />
}

export const HStack = (props: DirectionalStackProps) => {
  return <Stack {...props} direction="horizontal" />
}
