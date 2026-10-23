import { cva, VariantProps } from "class-variance-authority"
import { cn } from "cn"
import type { ElementType } from "react"
import { Typography, TypographyProps } from "./typography"

const labelVariants = cva("font-mono", {
  variants: {
    variant: {
      eyebrow: "text-xs leading-snug font-medium tracking-[0.3em] uppercase",
      caption: "text-xs leading-normal tracking-[0.28em] uppercase",
      meta: "text-sm leading-normal tracking-widest",
    },
  },
  defaultVariants: { variant: "eyebrow" },
})

export const Label = <T extends ElementType = "span">({
  as,
  variant,
  className,
  ...props
}: TypographyProps<T, VariantProps<typeof labelVariants>>) => {
  return (
    <Typography<ElementType>
      as={as ?? "span"}
      className={cn(labelVariants({ variant }), className)}
      {...props}
    />
  )
}
