import Image from 'next/image'
import { siteContent } from '@/lib/site-content'

export function Vision() {
  const { vision } = siteContent
  return (
    <section
      id={vision.id}
      className="relative scroll-mt-24 overflow-hidden bg-ink text-ink-foreground md:scroll-mt-40"
    >
      <Image
        src="/images/section-vision-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/88 via-ink/85 to-ink/94" />

      <div className="relative mx-auto max-w-4xl section-x py-16 md:py-24">
        <div className="flex flex-col gap-6">
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
