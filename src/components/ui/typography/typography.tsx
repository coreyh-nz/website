import { cva, VariantProps } from "class-variance-authority"
import { cn } from "cn"
import type { ComponentPropsWithoutRef, ElementType } from "react"

const typographyVariants = cva("", {
  variants: {
    colour: {
      brand: "",
    },
  },
  defaultVariants: {
    colour: "brand",
  },
})

export type TypographyProps<
  T extends ElementType,
  OwnProps = object,
> = OwnProps & {
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, keyof OwnProps | "as"> &
  VariantProps<typeof typographyVariants>

export const Typography = <T extends ElementType>({
  as,
  colour,
  className,
  ...props
}: TypographyProps<T>) => {
  const Component: ElementType = as ?? "p"
  return (
    <Component
      className={cn(typographyVariants({ colour }), className)}
      {...props}
    />
  )
}
