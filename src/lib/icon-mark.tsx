import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

const BLUE = "#155dfc" // --primary
const PAPER = "#fafbff" //--paper;
const DETAIL_MIN = 64

// unbounded semibold subset to just "C"
const font = readFile(join(process.cwd(), "assets/unbounded-semibold-c.ttf"))

export const iconMark = async (
  px: number,
  { rounded }: { rounded: boolean }
) => {
  const detailed = px >= DETAIL_MIN
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: BLUE,
        borderRadius: rounded ? px * 0.22 : 0,
        color: PAPER,
        fontFamily: "Unbounded",
        fontSize: px * (detailed ? 0.68 : 0.78),
        lineHeight: 1,
      }}
    >
      C
    </div>,
    {
      width: px,
      height: px,
      fonts: [{ name: "Unbounded", data: await font, weight: 600 }],
    }
  )
}
