import Image from 'next/image'
import { siteContent } from '@/lib/site-content'

export function WhatWeDo() {
  const { whatWeDo } = siteContent
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <Image
        src="/images/section-whatwedo-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/86 to-ink/94" />

      <div className="relative mx-auto max-w-4xl section-x py-16 text-center md:py-24">
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
