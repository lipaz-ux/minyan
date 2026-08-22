import Image from 'next/image'
import { siteContent } from '@/lib/site-content'

export function Founder() {
  const { founder } = siteContent
  return (
    <section
      id="about"
      className="relative flex min-h-[70vh] scroll-mt-24 items-center overflow-hidden bg-ink text-ink-foreground md:min-h-[85vh] md:scroll-mt-40"
    >
      <Image
        src={founder.image || '/placeholder.svg'}
        alt={founder.name}
        fill
        sizes="100vw"
        className="object-cover object-[35%_65%]"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-ink from-30% via-ink/70 via-45% to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl section-x py-16 md:py-24">
        <div className="flex flex-col md:ml-auto md:max-w-lg">
          <p className="text-lg text-accent">{founder.title}</p>
          <h2 className="font-display mt-2 text-balance text-4xl md:text-5xl">{founder.name}</h2>
          <div className="mt-6 flex flex-col gap-5">
            {founder.paragraphs.map((p, i) => (
              <p key={i} className="text-pretty text-lg leading-relaxed text-ink-foreground/80">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
