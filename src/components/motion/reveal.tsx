"use client"

import {
  motion,
  stagger,
  type HTMLMotionProps,
  type Variants,
} from "motion/react"

const rise = (delay?: number, y = 24): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      ...(delay !== undefined && { delay }),
    },
  },
})

type RevealProps = HTMLMotionProps<"div"> & {
  /** "view" waits until scrolled into view, "mount" plays on page load */
  trigger?: "view" | "mount"
  /** seconds between each child */
  stagger?: number
  /** seconds before the first child starts */
  delay?: number
  /** fraction of the element that must be visible to trigger */
  amount?: number
}

export const Reveal = ({
  trigger = "view",
  stagger: step = 0.1,
  delay = 0,
  amount = 0.2,
  ...props
}: RevealProps) => {
  const play =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: { once: true, amount } }

  return (
    <motion.div
      initial="hidden"
      {...play}
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: stagger(step, { startDelay: delay }) },
        },
      }}
      {...props}
    />
  )
}

type RevealItemProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  as?: "div" | "span" | "p" | "li"
  /** exact start time in seconds, overriding the parent's stagger */
  delay?: number
  /** starting offset in px; negative drops in from above */
  y?: number
}

// picks up its state from the nearest Reveal, however deeply nested.
export const RevealItem = ({
  as = "div",
  delay,
  y,
  ...props
}: RevealItemProps) => {
  const Component = motion[as] as typeof motion.div
  return <Component variants={rise(delay, y)} {...props} />
}
