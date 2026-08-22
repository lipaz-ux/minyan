import Image from 'next/image'
import { siteContent } from '@/lib/site-content'

export function Vision() {
  const { vision } = siteContent
  return (
    <section
      id={vision.id}
      className="relative scroll-mt-24 overflow-hidden bg-ink text-ink-foreground"
    >
      <Image
        src="/images/section-vision-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/75 to-ink/90" />

      <div className="relative mx-auto max-w-4xl section-x py-24 md:py-32">
        <p className="text-balance text-3xl leading-snug md:text-4xl lg:text-5xl">
          {vision.lead}
        </p>
        <div className="mt-10 flex flex-col gap-6">
          {vision.paragraphs.map((p, i) => (
            <p key={i} className="text-pretty text-lg leading-relaxed text-ink-foreground/80">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
