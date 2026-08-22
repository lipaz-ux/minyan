import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'צרו קשר | מניין',
  description:
    'מעוניינים בשיתוף פעולה, ארוחת שבת פרטית, סדנה לארגון או סתם רוצים לומר שלום? נשמח לשמוע.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl section-x py-16 md:py-24">
      <header className="mb-12">
        <h1 className="font-display text-balance text-5xl leading-tight text-foreground md:text-6xl">
          דברו איתנו
        </h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
          בין אם אתם מתעניינים בארוחת שבת פרטית, בשעת השראה לארגון, בשיתוף
          פעולה, או סתם רוצים לומר שלום — נשמח לשמוע ונחזור אליכם בהקדם.
        </p>
      </header>

      <ContactForm />

      <div className="mt-16 border-t border-border pt-8 text-muted-foreground">
        <p>אפשר גם ישירות במייל: hey@minyantlv.com</p>
      </div>
    </div>
  )
}
