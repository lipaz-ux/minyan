import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import type { EventRecord } from '@/lib/types'
import { categoryLabel } from '@/lib/categories'
import { formatEventDateShort, isSoldOut, isPast } from '@/lib/events'

export function EventCard({ event }: { event: EventRecord }) {
  const past = isPast(event)
  const soldOut = !past && isSoldOut(event)

  return (
    <Link
      href={`/event/${event.slug}`}
      className="group flex flex-col focus:outline-none"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <Image
          src={event.hero_image || '/placeholder.svg'}
          alt={event.title_he}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {(soldOut || past) && (
          <span className="absolute end-3 top-3 rounded-sm bg-ink/85 px-3 py-1 text-xs text-ink-foreground">
            {past ? 'אירוע שהיה' : 'אזל'}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{formatEventDateShort(event.start_date)}</span>
          <span aria-hidden>·</span>
          <span>{categoryLabel(event.category)}</span>
        </div>

        <h3 className="mt-2 text-balance text-2xl leading-tight text-foreground transition-colors group-hover:text-accent">
          {event.title_he}
        </h3>

        <p className="mt-2 line-clamp-2 leading-relaxed text-muted-foreground">
          {event.short_description_he}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" />
          <span className="truncate">{event.location_name}</span>
        </div>

        <div className="mt-4 flex items-center justify-between pt-1">
          <span className="text-sm text-foreground">
            {event.price > 0 ? `${event.price} ₪` : 'ללא עלות'}
          </span>
          <span className="text-sm text-foreground underline-offset-4 group-hover:underline">
            {past ? 'לצפייה באירוע' : 'לפרטים והרשמה'}
          </span>
        </div>
      </div>
    </Link>
  )
}
