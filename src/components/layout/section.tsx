import { cva, VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { ComponentProps } from "react"

const sectionVariants = cva("relative overflow-hidden", {
  variants: {
    surface: {
      paper: "",
      ink: "",
      brand: "bg-primary",
    },
    padding: {
      true: "py-32",
      false: "",
    },
  },
  defaultVariants: {
    surface: "paper",
    padding: true,
  },
})

export const Section = ({
  as: Component = "section",
  surface,
  padding,
  className,
  ...props
}: ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & { as?: "section" | "footer" }) => {
  return (
    <Component
      className={cn(sectionVariants({ surface, padding, className }))}
      {...props}
    />
  )
}
