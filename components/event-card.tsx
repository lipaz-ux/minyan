import Image from 'next/image'
import Link from 'next/link'
import type { EventRecord } from '@/lib/types'
import { categoryLabel } from '@/lib/categories'
import { formatEventDateShort, isSoldOut, isPast } from '@/lib/events'

export function EventCard({ event }: { event: EventRecord }) {
  const past = isPast(event)
  const soldOut = !past && isSoldOut(event)

  return (
    <Link
      href={`/event/${event.slug}`}
      className="group relative flex aspect-[4/5] w-full overflow-hidden bg-ink focus:outline-none"
    >
      <Image
        src={event.hero_image || '/placeholder.svg'}
        alt={event.title_he}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/45 to-transparent" />

      {(soldOut || past) && (
        <span className="absolute end-4 top-4 rounded-full border border-ink-foreground/70 px-3 py-1 text-xs text-ink-foreground">
          {past ? 'אירוע שהיה' : 'אזל'}
        </span>
      )}

      <div className="relative mt-auto flex flex-col p-6">
        <p className="text-sm font-medium tracking-wide text-accent">{categoryLabel(event.category)}</p>
        <h3 className="font-display mt-2 text-balance text-3xl leading-tight text-ink-foreground">
          {event.title_he}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-sm text-ink-foreground/75">
          <span>{formatEventDateShort(event.start_date)}</span>
          <span aria-hidden>·</span>
          <span className="truncate">{event.location_name}</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-ink-foreground">
            {event.price > 0 ? `${event.price} ₪` : 'ללא עלות'}
          </span>
          <span className="text-sm text-ink-foreground underline-offset-4 group-hover:underline">
            {past ? 'לצפייה באירוע' : 'לפרטים והרשמה'}
          </span>
        </div>
      </div>
    </Link>
  )
}
