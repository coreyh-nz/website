import { site } from "@/lib/content/site"
import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const robots = (): MetadataRoute.Robots => {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  }
}

export default robots
