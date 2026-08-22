import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מדיניות פרטיות | מניין',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl section-x pt-28 pb-16 md:pt-48 md:pb-24">
      <h1 className="font-display text-balance text-4xl leading-tight text-foreground md:text-5xl">
        מדיניות פרטיות
      </h1>
      <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
        מדיניות הפרטיות המלאה של מניין נמצאת בהכנה ותפורסם כאן בקרוב. אנחנו
        מתייחסים ברצינות לפרטיות המידע שאתם משאירים אצלנו. לשאלות אפשר לפנות
        אלינו ב-
        <a href="mailto:hey@minyantlv.com" className="underline underline-offset-4">
          hey@minyantlv.com
        </a>
        .
      </p>
    </div>
  )
}
