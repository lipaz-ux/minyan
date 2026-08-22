import Image from 'next/image'
import Link from 'next/link'
import { siteContent } from '@/lib/site-content'

export function PrivateExperiences() {
  const { private: p } = siteContent
  return (
    <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-ink text-ink-foreground md:min-h-[60vh]">
      <Image
        src="/images/beit-midrash.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/30" />

      <div className="relative mx-auto max-w-4xl section-x py-16 text-center md:py-20">
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
