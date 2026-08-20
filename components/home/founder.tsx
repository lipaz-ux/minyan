import Image from 'next/image'
import { siteContent } from '@/lib/site-content'

export function Founder() {
  const { founder } = siteContent
  return (
    <section id="about" className="scroll-mt-24 bg-secondary/50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 section-x py-20 md:grid-cols-[minmax(0,0.9fr)_1.1fr] md:gap-16 md:py-28">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
          <Image
            src={founder.image || '/placeholder.svg'}
            alt={founder.name}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-lg text-accent">{founder.title}</p>
          <h2 className="font-display mt-2 text-balance text-4xl text-foreground md:text-5xl">
            {founder.name}
          </h2>
          <div className="mt-6 flex flex-col gap-5">
            {founder.paragraphs.map((p, i) => (
              <p key={i} className="text-pretty text-lg leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
