'use client'

import { CalendarPlus, MapPin } from 'lucide-react'
import type { EventRecord } from '@/lib/types'

function toICSDate(dateStr: string, time?: string) {
  const d = new Date(dateStr)
  if (time) {
    const [h, m] = time.split(':').map(Number)
    d.setHours(h || 0, m || 0, 0, 0)
  }
  return d
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
}

export function ConfirmationActions({ event }: { event: EventRecord }) {
  function downloadICS() {
    const start = toICSDate(event.start_date, event.start_time)
    const end = toICSDate(event.end_date || event.start_date, event.end_time || event.start_time)
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MINYAN//events//HE',
      'BEGIN:VEVENT',
      `UID:${event.id}@minyantlv.com`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${event.title_he}`,
      `LOCATION:${[event.location_name, event.address, event.city].filter(Boolean).join(', ')}`,
      `DESCRIPTION:${event.short_description_he}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${event.slug}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  const mapsUrl =
    event.google_maps_url ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      [event.location_name, event.address, event.city].filter(Boolean).join(', '),
    )}`

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
      <button
        onClick={downloadICS}
        className="inline-flex w-full items-center justify-center gap-2 border border-border px-6 py-3 text-foreground transition-colors hover:bg-secondary sm:w-auto"
      >
        <CalendarPlus className="size-5" />
        הוספה ליומן
      </button>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 border border-border px-6 py-3 text-foreground transition-colors hover:bg-secondary sm:w-auto"
      >
        <MapPin className="size-5" />
        פתיחה ב־Google Maps
      </a>
    </div>
  )
}
