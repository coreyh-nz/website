import { iconMark } from "@/lib/icon-mark"

export const size = { width: 32, height: 32 }
export const dynamic = "force-static"

const Icon = () => {
  return iconMark(size.width, { rounded: true })
}

export default Icon
