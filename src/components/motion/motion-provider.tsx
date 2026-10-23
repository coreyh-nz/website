"use client"

import { MotionConfig } from "motion/react"
import { ReactNode } from "react"

export const MotionProvider = ({ children }: { children: ReactNode }) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
