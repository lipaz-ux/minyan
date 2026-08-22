import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, MapPin, Tag, User } from 'lucide-react'
import {
  getEventBySlug,
  formatEventDate,
  isPast,
  isSoldOut,
  availableSpots,
  EVENTS,
} from '@/lib/events'
import { categoryLabel } from '@/lib/categories'
import { formatPrice } from '@/lib/types'
import { EventRegistrationCta } from '@/components/event-registration-cta'

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) return { title: 'אירוע לא נמצא | מניין' }
  return {
    title: event.seo_title || `${event.title_he} | מניין`,
    description: event.meta_description || event.short_description_he,
    openGraph: {
      title: event.title_he,
      description: event.short_description_he,
      images: [event.og_image || event.hero_image],
      type: 'article',
    },
  }
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) notFound()

  const past = isPast(event)
  const soldOut = isSoldOut(event)
  const spots = availableSpots(event)
  const categoryDisplayLabel = categoryLabel(event.category)

  return (
    <article className="pb-28 md:pb-0">
      {/* Photo band */}
      <div className="relative h-[42vh] w-full overflow-hidden md:h-[56vh]">
        <Image
          src={event.hero_image || '/placeholder.svg'}
          alt={event.title_he}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/50 to-ink/90" />
      </div>

      <div className="relative z-10 mx-auto -mt-24 max-w-5xl section-x md:-mt-32">
        <header className="text-center">
          <p className="text-sm font-medium tracking-wide text-accent">{categoryDisplayLabel}</p>
          <h1 className="font-display mt-3 text-balance text-4xl leading-tight text-ink-foreground md:text-6xl">
            {event.title_he}
          </h1>
        </header>

        <div className="mt-14 grid gap-12 md:grid-cols-[280px_1fr] md:gap-16">
          {/* Sticky facts + CTA sidebar */}
          <aside className="flex flex-col gap-6 border border-border bg-card p-7 md:sticky md:top-48 md:self-start">
            {!past && (
              <div>
                <p className="font-display text-3xl text-foreground">{formatPrice(event.price)}</p>
                {event.show_remaining_capacity && spots !== null && !soldOut && (
                  <p className="mt-1 text-sm text-accent">נשארו {spots} מקומות</p>
                )}
              </div>
            )}

            <Fact icon={<CalendarDays className="size-4" />} label="תאריך ושעה">
              {formatEventDate(event.start_date)}
              {event.start_time ? `, ${event.start_time}` : ''}
              {event.end_time ? `–${event.end_time}` : ''}
            </Fact>
            <Fact icon={<MapPin className="size-4" />} label="מיקום">
              {event.location_name}
              {event.address ? ` · ${event.address}` : ''}
              {event.city ? `, ${event.city}` : ''}
              {event.google_maps_url && (
                <a
                  href={event.google_maps_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-sm text-foreground underline underline-offset-4"
                >
                  פתיחה ב־Google Maps
                </a>
              )}
            </Fact>
            {event.facilitator && (
              <Fact icon={<User className="size-4" />} label="בהנחיית">
                {event.facilitator}
              </Fact>
            )}
            <Fact icon={<Tag className="size-4" />} label="קטגוריה">
              {categoryDisplayLabel}
            </Fact>

            {!past && (
              <div className="pt-2">
                <EventRegistrationCta event={event} variant="inline" />
              </div>
            )}
          </aside>

          {/* Article */}
          <div className="max-w-[62ch]">
            <p className="font-display text-xl leading-relaxed text-foreground md:text-2xl">
              {event.short_description_he}
            </p>
            <div className="mt-6 flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
              {event.full_description_he.split('\n\n').map((p, i) => (
                <p key={i} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-14 border-t border-border pt-8">
              <Link
                href="/events"
                className="text-lg text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                → לכל האירועים
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      {!past && <EventRegistrationCta event={event} variant="sticky-mobile" />}
    </article>
  )
}

function Fact({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 text-accent">{icon}</span>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="mt-0.5 text-[15px] text-foreground">{children}</div>
      </div>
    </div>
  )
}
