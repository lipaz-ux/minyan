import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Minyan | Tel Aviv',
  description: 'A house for bold, open, Tel Aviv-style Jewish creation.',
}

export default function EnglishPage() {
  return (
    <div dir="ltr" className="mx-auto max-w-2xl section-x pt-32 pb-20 text-center md:pt-52 md:pb-28">
      <h1 className="font-display text-balance text-4xl leading-tight text-foreground md:text-5xl">
        English version coming soon
      </h1>
      <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
        We&apos;re still working on the full English translation of our site.
        In the meantime, feel free to reach out directly and we&apos;ll be
        happy to help in English too.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center bg-ink px-7 py-3.5 text-lg text-ink-foreground transition-opacity hover:opacity-90"
        >
          Contact us
        </Link>
        <Link
          href="/"
          className="text-lg text-foreground underline underline-offset-4"
        >
          Back to the Hebrew site
        </Link>
      </div>
    </div>
  )
}
