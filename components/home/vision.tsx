import { siteContent } from '@/lib/site-content'

export function Vision() {
  const { vision } = siteContent
  return (
    <section id={vision.id} className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-4xl section-x py-20 md:py-28">
        <p className="text-balance text-3xl leading-snug text-foreground md:text-4xl lg:text-5xl">
          {vision.lead}
        </p>
        <div className="mt-10 flex flex-col gap-6">
          {vision.paragraphs.map((p, i) => (
            <p key={i} className="text-pretty text-lg leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
