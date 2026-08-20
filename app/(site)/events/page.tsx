import type { Metadata } from 'next'
import { EventsBrowser } from '@/components/events-browser'
import { getPublishedUpcoming, getPastEvents } from '@/lib/events'
import { CATEGORIES, type CategorySlug } from '@/lib/categories'

export const metadata: Metadata = {
  title: 'האירועים של מניין',
  description:
    'כל האירועים של מניין — ארוחות שבת, בתי מדרש, התכנסויות חגים וסדנאות. הרשמה קלה, בלי חשבון.',
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const initialCategory =
    category && category in CATEGORIES ? (category as CategorySlug) : undefined

  const upcoming = getPublishedUpcoming()
  const past = getPastEvents()

  return (
    <div className="mx-auto max-w-7xl section-x py-16 md:py-24">
      <header className="mb-12 md:mb-16">
        <h1 className="text-balance text-5xl leading-tight text-foreground md:text-7xl">
          האירועים של מניין
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          בואו לחגוג, ללמוד ולהתכנס יחד. בחרו אירוע, הירשמו בכמה שניות — ונתראה.
        </p>
      </header>

      <EventsBrowser upcoming={upcoming} past={past} initialCategory={initialCategory} />
    </div>
  )
}
