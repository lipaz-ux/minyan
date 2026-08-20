import Link from 'next/link'
import { siteContent } from '@/lib/site-content'

export function PrivateExperiences() {
  const { private: p } = siteContent
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-4xl section-x py-20 text-center md:py-28">
        <h2 className="text-balance text-4xl leading-tight md:text-5xl">{p.title}</h2>
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
