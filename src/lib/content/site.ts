import {
  GithubIcon,
  Linkedin01Icon,
  Mail01Icon,
  ProfileIcon,
} from "@sketchicon/hugeicons"
import { SiteLink } from "./types"

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://coreyh.nz",
  analytics: {
    umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  },
  name: {
    first: "Corey",
    last: "Hines",
    full: "Corey Hines",
  },
  hero: {
    eyebrow: "Software engineer \u00B7 Christchurch, NZ",
    lead: { before: "Hi, I ", emphasis: "make", after: " things." },
    intro:
      "I work across the stack, mostly in Kotlin and TypeScript. In my spare time, I'm usually starting another side project, and more recently I've gone down the distributed systems rabbit hole.",
    facts: [
      {
        term: "Studying",
        detail: "BE(Hons) Software Engineering, University of Canterbury",
      },
      { term: "Graduating", detail: "2027" },
    ],
  },
  links: {
    cv: {
      label: "CV",
      href: "/cv.pdf",
      icon: ProfileIcon,
      external: true,
    },
    github: {
      label: "GitHub",
      href: "https://github.com/coreyh-nz",
      icon: GithubIcon,
      external: true,
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/coreyh-nz",
      icon: Linkedin01Icon,
      external: true,
    },
    email: {
      label: "Email",
      href: "mailto:me@coreyh.nz",
      icon: Mail01Icon,
      external: false,
    },
  } satisfies Record<string, SiteLink>,
}
