import { siteContent } from '@/lib/site-content'

export function WhatWeDo() {
  const { whatWeDo } = siteContent
  return (
    <section id={whatWeDo.id} className="scroll-mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto max-w-4xl section-x py-20 text-center md:py-28">
        <h2 className="font-display text-4xl md:text-6xl">{whatWeDo.title}</h2>
        <p className="mx-auto mt-8 max-w-3xl text-balance text-2xl leading-snug md:text-3xl">
          {whatWeDo.lead}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-foreground/75">
          {whatWeDo.body}
        </p>
        <p className="mt-10 font-display text-3xl text-cream md:text-4xl">
          {whatWeDo.signoff}
        </p>
      </div>
    </section>
  )
}
