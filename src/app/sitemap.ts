import { site } from "@/lib/content/site"
import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const sitemap = (): MetadataRoute.Sitemap => {
  return [{ url: site.url, lastModified: new Date() }]
}

export default sitemap
