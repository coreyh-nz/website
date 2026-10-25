import { iconMark } from "@/lib/icon-mark"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"
export const dynamic = "force-static"

// iOS applies its own rounded mask, so this one stays square.
const AppleIcon = () => {
  return iconMark(size.width, { rounded: false })
}

export default AppleIcon
