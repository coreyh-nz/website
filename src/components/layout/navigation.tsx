import { nav } from "@/lib/content/nav"
import { site } from "@/lib/content/site"
import Link from "next/link"
import { SketchIcon } from "sketchicon/server"
import { Reveal, RevealItem } from "../motion/reveal"
import { Button } from "../ui/button"
import { Container } from "./container"
import { HStack } from "./stack"

export const Navigation = () => {
  return (
    <header className="sticky top-0 z-10 bg-background">
      <Container padding>
        <Reveal
          trigger="mount"
          stagger={0.08}
          className="flex items-center gap-8 py-2"
        >
          <RevealItem y={-12}>
            <Link
              href="/"
              className="font-display text-base leading-none font-semibold tracking-tight whitespace-nowrap"
            >
              {site.name.full}
            </Link>
          </RevealItem>

          <HStack as="nav" aria-label="social" className="ml-auto">
            {nav.socials.map((link) => (
              <RevealItem key={link.label} y={-12}>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  render={
                    <Link
                      href={link.href}
                      aria-label={`${link.label} (opens in new tab)`}
                      {...(link.external && {
                        target: "_blank",
                        rel: "noopener",
                      })}
                    />
                  }
                  nativeButton={false}
                >
                  <SketchIcon icon={link.icon} />
                </Button>
              </RevealItem>
            ))}
          </HStack>
        </Reveal>
      </Container>
    </header>
  )
}
