import { cva, VariantProps } from "class-variance-authority"
import { cn } from "cn"
import type { ElementType } from "react"
import { Typography, TypographyProps } from "./typography"

const leadVariants = cva("font-body", {
  variants: {
    size: {
      base: "text-xl leading-normal md:text-2xl",
      lg: "text-3xl leading-tight tracking-tight md:text-4xl",
    },
  },
  defaultVariants: { size: "base" },
})

export const Lead = <T extends ElementType = "p">({
  as,
  size,
  className,
  ...props
}: TypographyProps<T, VariantProps<typeof leadVariants>>) => {
  return (
    <Typography<ElementType>
      as={as ?? "p"}
      className={cn(leadVariants({ size }), className)}
      {...props}
    />
  )
}
