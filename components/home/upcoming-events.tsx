import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getFeatured } from '@/lib/events'
import { EventCard } from '@/components/event-card'

export function UpcomingEvents() {
  const events = getFeatured(4)
  if (events.length === 0) return null

  return (
    <section className="bg-secondary/50">
      <div className="mx-auto max-w-7xl section-x py-20 md:py-28">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-balance text-4xl text-foreground md:text-5xl">
            האירועים הקרובים
          </h2>
          <Link
            href="/events"
            className="hidden shrink-0 items-center gap-2 text-lg text-foreground underline-offset-4 hover:underline md:inline-flex"
          >
            לכל האירועים
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-lg text-foreground underline-offset-4 hover:underline"
          >
            לכל האירועים
            <ArrowLeft className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
