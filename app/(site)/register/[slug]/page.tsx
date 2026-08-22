import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEventBySlug, formatEventDate, isPast } from '@/lib/events'
import { formatPrice } from '@/lib/types'
import { RegistrationForm } from '@/components/registration-form'

export const metadata: Metadata = {
  title: 'הרשמה | מניין',
  robots: { index: false },
}

export default async function RegisterPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ waitlist?: string }>
}) {
  const { slug } = await params
  const { waitlist: waitlistParam } = await searchParams
  const event = getEventBySlug(slug)
  if (!event || isPast(event)) notFound()

  const waitlist = waitlistParam === '1'

  return (
    <div className="mx-auto max-w-2xl section-x pt-28 pb-14 md:pt-44 md:pb-20">
      <Link
        href={`/event/${event.slug}`}
        className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        → חזרה לאירוע
      </Link>

      <header className="mt-6">
        <h1 className="font-display text-balance text-4xl leading-tight text-foreground md:text-5xl">
          {waitlist ? 'הצטרפות לרשימת המתנה' : 'הרשמה לאירוע'}
        </h1>
        <p className="mt-3 text-xl text-foreground">{event.title_he}</p>
        <p className="mt-1 text-muted-foreground">
          {formatEventDate(event.start_date)} · {event.start_time} · {event.location_name}
        </p>
        {!waitlist && event.price > 0 && (
          <p className="mt-1 text-muted-foreground">מחיר לכרטיס: {formatPrice(event.price)}</p>
        )}
      </header>

      {waitlist && (
        <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
          האירוע מלא כרגע. השאירו פרטים ונעדכן אתכם ברגע שמתפנה מקום — לא נחייב אתכם.
        </p>
      )}

      <div className="mt-10">
        <RegistrationForm event={event} waitlist={waitlist} />
      </div>
    </div>
  )
}
