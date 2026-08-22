import Image from 'next/image'
import Link from 'next/link'
import { siteContent } from '@/lib/site-content'

export function PrivateExperiences() {
  const { private: p } = siteContent
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <Image
        src="/images/section-private-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/80 to-ink/90" />

      <div className="relative mx-auto max-w-4xl section-x py-16 text-center md:py-24">
        <h2 className="font-display text-balance text-4xl leading-tight md:text-5xl">{p.title}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-foreground/75">
          {p.body}
        </p>
        <Link
          href={p.cta.href}
          className="mt-9 inline-flex items-center justify-center rounded-sm bg-cream px-7 py-3.5 text-lg text-ink transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {p.cta.label}
        </Link>
      </div>
    </section>
  )
}
