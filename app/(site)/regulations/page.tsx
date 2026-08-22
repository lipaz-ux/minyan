import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'תקנון | מניין',
  robots: { index: false },
}

export default function RegulationsPage() {
  return (
    <div className="mx-auto max-w-2xl section-x py-16 md:py-24">
      <h1 className="font-display text-balance text-4xl leading-tight text-foreground md:text-5xl">
        תקנון
      </h1>
      <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
        התקנון המלא של מניין נמצא בהכנה ויפורסם כאן בקרוב. לשאלות בנושא
        אפשר לפנות אלינו ב-
        <a href="mailto:hey@minyantlv.com" className="underline underline-offset-4">
          hey@minyantlv.com
        </a>
        .
      </p>
    </div>
  )
}
