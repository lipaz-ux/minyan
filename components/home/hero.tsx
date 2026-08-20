import Image from 'next/image'
import Link from 'next/link'
import { siteContent } from '@/lib/site-content'

export function Hero() {
  const { hero } = siteContent
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden">
      <Image
        src="/images/hero-shabbat-table.png"
        alt="שולחן ארוחת שבת מואר בנרות בתל אביב"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* legibility scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/20" />

      <div className="relative mx-auto w-full max-w-7xl section-x pb-16 md:pb-24">
        <p className="text-lg text-ink-foreground/85 md:text-xl">{hero.eyebrow}</p>
        <h1 className="font-display mt-3 max-w-4xl text-balance text-5xl leading-[1.05] text-ink-foreground md:text-7xl lg:text-8xl">
          {hero.title}
        </h1>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center rounded-sm bg-cream px-7 py-3.5 text-lg text-ink transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-sm border border-cream/70 px-7 py-3.5 text-lg text-ink-foreground transition-colors hover:bg-cream/10"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
