import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { siteContent } from '@/lib/site-content'
import { cn } from '@/lib/utils'

export function Worlds() {
  return (
    <section className="bg-background">
      {siteContent.worlds.map((world, i) => {
        const reversed = i % 2 === 1
        return (
          <div
            key={world.title}
            className="mx-auto grid max-w-7xl items-center gap-8 section-x py-16 md:grid-cols-2 md:gap-16 md:py-24"
          >
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
        )
      })}
    </section>
  )
}
