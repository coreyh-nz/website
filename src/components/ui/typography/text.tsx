import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import type { ElementType } from "react"
import { Typography, TypographyProps } from "./typography"

const textVariants = cva("font-body", {
  variants: {
    size: {
      base: "text-lg leading-relaxed max-w-[62ch]",
      md: "text-base leading-snug",
      sm: "text-sm leading-relaxed",
    },
  },
  defaultVariants: { size: "base" },
})

export const Text = <T extends ElementType = "p">({
  as,
  size,
  className,
  ...props
}: TypographyProps<T, VariantProps<typeof textVariants>>) => {
  return (
    <Typography<ElementType>
      as={as ?? "p"}
      className={cn(textVariants({ size }), className)}
      {...props}
    />
  )
}
