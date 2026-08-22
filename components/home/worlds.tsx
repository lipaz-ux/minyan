import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { siteContent } from '@/lib/site-content'
import { cn } from '@/lib/utils'

function WorldsDivider() {
  return (
    <div className="mx-auto flex max-w-3xl items-center gap-4 section-x" aria-hidden="true">
      <span className="h-px flex-1 bg-border" />
      <svg width="14" height="14" viewBox="0 0 14 14" className="shrink-0 text-accent/70">
        <rect x="3" y="3" width="8" height="8" transform="rotate(45 7 7)" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

export function Worlds() {
  return (
    <section className="bg-background">
      {siteContent.worlds.map((world, i) => {
        const reversed = i % 2 === 1
        return (
          <div key={world.title}>
            {i > 0 && <WorldsDivider />}
            <div className="mx-auto grid max-w-7xl items-center gap-8 section-x py-16 md:grid-cols-2 md:gap-16 md:py-24">
              <div
                className={cn(
                  'relative aspect-[4/5] w-full overflow-hidden bg-secondary md:aspect-[4/3]',
                  reversed ? 'md:order-2' : 'md:order-1',
                )}
              >
                <Image
                  src={world.image || '/placeholder.svg'}
                  alt={world.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className={cn('flex flex-col', reversed ? 'md:order-1' : 'md:order-2')}>
                <p className="text-xl leading-relaxed text-accent md:text-2xl">
                  {world.source}
                </p>
                <h2 className="font-display mt-4 text-balance text-4xl leading-tight text-foreground md:text-5xl">
                  {world.title}
                </h2>
                <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                  {world.body}
                </p>
                <Link
                  href={world.cta.href}
                  className="mt-7 inline-flex items-center gap-2 self-start text-lg text-foreground underline-offset-4 hover:underline"
                >
                  {world.cta.label}
                  <ArrowLeft className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
