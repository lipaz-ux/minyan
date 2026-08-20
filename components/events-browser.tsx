'use client'

import { useMemo, useState } from 'react'
import { EventCard } from '@/components/event-card'
import { CATEGORIES, type CategorySlug } from '@/lib/categories'
import type { EventRecord } from '@/lib/types'

const FILTERS: { slug: CategorySlug | 'all'; label: string }[] = [
  { slug: 'all', label: 'הכל' },
  { slug: 'shabbat', label: 'ארוחות שבת' },
  { slug: 'beit-midrash', label: 'בית מדרש' },
  { slug: 'holidays', label: 'חגים ומועדים' },
  { slug: 'gatherings', label: 'התכנסויות' },
  { slug: 'workshops', label: 'סדנאות' },
  { slug: 'community', label: 'קהילה' },
]

export function EventsBrowser({
  upcoming,
  past,
  initialCategory,
}: {
  upcoming: EventRecord[]
  past: EventRecord[]
  initialCategory?: CategorySlug
}) {
  const [active, setActive] = useState<CategorySlug | 'all'>(initialCategory ?? 'all')

  const filteredUpcoming = useMemo(
    () => (active === 'all' ? upcoming : upcoming.filter((e) => e.category === active)),
    [active, upcoming],
  )

  return (
    <div>
      <div
        role="tablist"
        aria-label="סינון אירועים לפי קטגוריה"
        className="flex flex-wrap gap-x-6 gap-y-3 border-b border-border pb-6"
      >
        {FILTERS.map((f) => {
          const isActive = active === f.slug
          return (
            <button
              key={f.slug}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f.slug)}
              className={
                'text-lg transition-colors underline-offset-8 ' +
                (isActive
                  ? 'text-foreground underline decoration-2'
                  : 'text-muted-foreground hover:text-foreground')
              }
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {filteredUpcoming.length > 0 ? (
        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUpcoming.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-lg text-muted-foreground">
          אין אירועים קרובים בקטגוריה הזו כרגע. הצטרפו לרשימת התפוצה כדי לשמוע ראשונים.
        </p>
      )}

      {past.length > 0 && (
        <section className="mt-24">
          <h2 className="text-3xl text-foreground md:text-4xl">אירועים שהיו</h2>
          <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
            כל מה שכבר קרה במניין — נשמר כאן כארכיון קהילתי.
          </p>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((e) => (
              <EventCard key={e.id} event={e} past />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
