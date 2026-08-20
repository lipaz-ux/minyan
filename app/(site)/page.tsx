import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { Vision } from "@/components/home/vision"
import { WhatWeDo } from "@/components/home/what-we-do"
import { Worlds } from "@/components/home/worlds"
import { UpcomingEvents } from "@/components/home/upcoming-events"
import { PrivateExperiences } from "@/components/home/private-experiences"
import { Partners } from "@/components/home/partners"
import { Founder } from "@/components/home/founder"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { siteContent } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "מניין — בית לתרבות ויצירה יהודית בועטת",
  description:
    "מניין הוא בית לתרבות ויצירה יהודית בתל אביב — ארוחות שבת, בתי מדרש, התכנסויות חגים ורוח. גלו את האירועים הקרובים והצטרפו.",
  openGraph: {
    title: "מניין — בית לתרבות ויצירה יהודית בועטת",
    description:
      "בית לתרבות ויצירה יהודית בתל אביב — ארוחות שבת, בתי מדרש והתכנסויות.",
    images: ["/images/hero-shabbat-table.png"],
    locale: "he_IL",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Vision />
      <WhatWeDo />
      <Worlds />
      <UpcomingEvents />
      <PrivateExperiences />
      <Partners />
      <Founder />
      <section id="newsletter" className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-2xl px-5 py-20 md:py-28">
          <NewsletterSignup
            heading={siteContent.newsletter.heading}
            body={siteContent.newsletter.body}
          />
        </div>
      </section>
    </>
  )
}
