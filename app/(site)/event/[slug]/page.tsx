import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Clock, MapPin, Tag } from 'lucide-react'
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
      {/* Hero */}
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src={event.hero_image || '/placeholder.svg'}
          alt={event.title_he}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      </div>

      <div className="mx-auto max-w-3xl section-x">
        <header className="-mt-16 relative">
          <p className="text-accent">{categoryDisplayLabel}</p>
          <h1 className="font-display mt-2 text-balance text-4xl leading-tight text-foreground md:text-6xl">
            {event.title_he}
          </h1>
          <p className="mt-4 text-pretty text-xl leading-relaxed text-muted-foreground">
            {event.short_description_he}
          </p>
        </header>

        {/* Key facts */}
        <dl className="mt-10 grid gap-6 border-y border-border py-8 sm:grid-cols-2">
          <Fact icon={<CalendarDays className="size-5" />} label="תאריך">
            {formatEventDate(event.start_date)}
          </Fact>
          <Fact icon={<Clock className="size-5" />} label="שעה">
            {event.start_time}
            {event.end_time ? `–${event.end_time}` : ''}
          </Fact>
          <Fact icon={<MapPin className="size-5" />} label="מיקום">
            {event.location_name}
            {event.address ? ` · ${event.address}` : ''}
          </Fact>
          <Fact icon={<Tag className="size-5" />} label="מחיר">
            {formatPrice(event.price)}
          </Fact>
        </dl>

        {!past && event.show_remaining_capacity && spots !== null && !soldOut && (
          <p className="mt-6 text-accent">נשארו {spots} מקומות</p>
        )}

        {/* Desktop / inline CTA */}
        <div className="mt-8">
          <EventRegistrationCta event={event} variant="inline" />
        </div>

        {/* About */}
        <section className="mt-14">
          <h2 className="text-2xl text-foreground md:text-3xl">על האירוע</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-foreground/90">
            {event.full_description_he.split('\n\n').map((p, i) => (
              <p key={i} className="text-pretty">
                {p}
              </p>
            ))}
          </div>
        </section>

        {event.facilitator && (
          <section className="mt-12">
            <h2 className="text-2xl text-foreground md:text-3xl">בהנחיית</h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/90">
              {event.facilitator}
            </p>
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-2xl text-foreground md:text-3xl">איפה נפגשים</h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/90">
            {event.location_name}
            {event.address ? `, ${event.address}` : ''}
            {event.city ? `, ${event.city}` : ''}
          </p>
          {event.google_maps_url && (
            <a
              href={event.google_maps_url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-foreground underline underline-offset-4"
            >
              פתיחה ב־Google Maps
            </a>
          )}
        </section>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/events"
            className="text-lg text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            → לכל האירועים
          </Link>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      {!past && (
        <EventRegistrationCta event={event} variant="sticky-mobile" />
      )}
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
        <dt className="text-sm text-muted-foreground">{label}</dt>
        <dd className="mt-0.5 text-lg text-foreground">{children}</dd>
      </div>
    </div>
  )
}
