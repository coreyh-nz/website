import { cn } from "cn"

export const CURTAIN_DELAY = 0.5

export const Curtain = ({ className }: { className?: string }) => {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 animate-curtain bg-primary motion-reduce:animate-none",
        className
      )}
    />
  )
}
