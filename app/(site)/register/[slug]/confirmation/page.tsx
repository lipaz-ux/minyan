import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEventBySlug, formatEventDate } from '@/lib/events'
import { ConfirmationActions } from '@/components/confirmation-actions'

export const metadata: Metadata = {
  title: 'נרשמת בהצלחה | מניין',
  robots: { index: false },
}

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) notFound()

  return (
    <div className="mx-auto max-w-xl section-x py-20 text-center md:py-28">
      <p className="font-display text-5xl text-foreground md:text-6xl">נתראה במניין ✨</p>
      <p className="mt-6 text-pretty text-xl leading-relaxed text-muted-foreground">
        נרשמת בהצלחה ל־<span className="text-foreground">{event.title_he}</span>
      </p>

      <dl className="mx-auto mt-10 max-w-sm space-y-3 border-y border-border py-8 text-start">
        <Row label="תאריך" value={formatEventDate(event.start_date)} />
        <Row
          label="שעה"
          value={`${event.start_time}${event.end_time ? `–${event.end_time}` : ''}`}
        />
        <Row label="מיקום" value={event.location_name} />
        {event.address && <Row label="כתובת" value={event.address} />}
      </dl>

      <div className="mt-8">
        <ConfirmationActions event={event} />
      </div>

      <div className="mt-10">
        <Link
          href="/events"
          className="text-lg text-foreground underline underline-offset-4"
        >
          לכל האירועים הקרובים
        </Link>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        שלחנו לכם אישור הרשמה במייל עם כל הפרטים.
      </p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  )
}
