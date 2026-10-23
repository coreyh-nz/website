import { MotionProvider } from "@/components/motion/motion-provider"
import { site } from "@/lib/content/site"
import type { Metadata } from "next"
import {
  Gaegu,
  Hanken_Grotesk,
  JetBrains_Mono,
  Unbounded,
} from "next/font/google"
import "./globals.css"

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
})

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

const gaegu = Gaegu({
  variable: "--font-gaegu",
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Corey Hines",
  description: "Software engineer in Christchurch, NZ.",
}

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${unbounded.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} ${gaegu.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}

export default RootLayout
