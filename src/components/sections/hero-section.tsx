import { site } from "@/lib/content/site"
import { ProfileIcon } from "@sketchicon/hugeicons"
import Link from "next/link"
import { SketchIcon } from "sketchicon"
import { Container } from "../layout/container"
import { Grid, GridCol } from "../layout/grid"
import { Section } from "../layout/section"
import { HStack, VStack } from "../layout/stack"
import { Curtain, CURTAIN_DELAY } from "../motion/curtain"
import { Reveal, RevealItem } from "../motion/reveal"
import { Button } from "../ui/button"
import { Underline } from "../ui/ink/underline"
import { Label, Lead, Text } from "../ui/typography"

const { name, hero } = site

export const HeroSection = () => {
  return (
    <Section className="flex flex-1 flex-col py-[clamp(1.5rem,4svh,3.5rem)]">
      <Curtain />
      <Container className="@container flex flex-1 flex-col" padding>
        <Reveal trigger="mount" className="flex flex-1 flex-col">
          <VStack gap="lg" className="flex-1 justify-center">
            <RevealItem delay={CURTAIN_DELAY}>
              <Label className="text-primary-foreground">{hero.eyebrow}</Label>
            </RevealItem>

            {/* two lines at leading-none are 2x the font size tall. capping the size at
                half the viewport minus everything else in the hero (~15rem per line)
                keeps the whole hero on screen on short, wide displays. but it never drops
                below 8rem. at full size the h1 is 24cqw text in a 100cqw box. */}
            <h1 className="flex w-[min(100%,calc(100em/24))] flex-col font-display text-[min(24cqw,max(8rem,calc(50svh-15rem)))] leading-none font-semibold tracking-tighter text-primary-foreground">
              <RevealItem
                as="span"
                delay={CURTAIN_DELAY + 0.1}
                className="block whitespace-nowrap"
              >
                {name.first}
              </RevealItem>
              {/* tracking-tighter is applied after every glyph, including the last, so
                  the final letter's ink overhangs the span. The right padding cancels
                  that out so the name stays flush with the container edge. */}
              <RevealItem
                as="span"
                delay={CURTAIN_DELAY + 0.22}
                className="ml-auto block pr-[calc(var(--tracking-tighter)*-1)] whitespace-nowrap"
              >
                {name.last}
              </RevealItem>
            </h1>

            <Grid className="mt-[clamp(1rem,3vw,3rem)]">
              <GridCol span={7}>
                <RevealItem delay={CURTAIN_DELAY + 0.4}>
                  <VStack gap="lg">
                    <Lead className="text-primary-foreground">
                      {hero.lead.before}
                      <Underline delay={CURTAIN_DELAY + 0.7}>
                        {hero.lead.emphasis}
                      </Underline>
                      {hero.lead.after}
                    </Lead>
                    <Text className="max-w-xl text-muted-foreground">
                      {hero.intro}
                    </Text>
                  </VStack>
                </RevealItem>
              </GridCol>
              <GridCol span={4} start={9}>
                <RevealItem delay={CURTAIN_DELAY + 0.55}>
                  <VStack gap="lg">
                    <VStack as="dl" gap="md">
                      {hero.facts.map((fact) => (
                        <VStack key={fact.term} gap="xs">
                          <Label
                            as="dt"
                            variant="caption"
                            className="text-primary-foreground"
                          >
                            {fact.term}
                          </Label>
                          <Text
                            as="dd"
                            size="md"
                            className="text-primary-foreground"
                          >
                            {fact.detail}
                          </Text>
                        </VStack>
                      ))}
                    </VStack>

                    <HStack wrap gap="md" align="center">
                      <Button
                        render={
                          <Link
                            href={site.links.cv.href}
                            target="_blank"
                            rel="noopener"
                            prefetch={false}
                            data-umami-event="cv-open"
                          />
                        }
                        nativeButton={false}
                      >
                        View CV
                        <SketchIcon icon={ProfileIcon} />
                      </Button>
                    </HStack>
                  </VStack>
                </RevealItem>
              </GridCol>
            </Grid>
          </VStack>
        </Reveal>
      </Container>
    </Section>
  )
}
