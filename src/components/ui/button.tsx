import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center gap-3",
    "border border-transparent bg-clip-padding whitespace-nowrap transition-colors outline-none select-none",
    "rounded-md font-body text-sm font-medium",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary-foreground text-primary hover:bg-primary-foreground/80",
        ghost: "text-primary hover:bg-primary/20",
      },
      size: {
        default:
          "h-12 gap-3 px-5.5 has-data-[icon=inline-end]:pr-4.5 has-data-[icon=inline-start]:pl-4.5",
        sm: "h-9 gap-2 px-3.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-14 gap-3 px-6.5 has-data-[icon=inline-end]:pr-5.5 has-data-[icon=inline-start]:pl-5.5 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-12",
        "icon-xs": "size-6",
        "icon-sm": "size-9",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const Button = ({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) => {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
