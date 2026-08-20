import Image from 'next/image'
import { getActivePartners } from '@/lib/partners'

export function Partners() {
  const partners = getActivePartners()
  if (partners.length === 0) return null

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl section-x py-16 md:py-20">
        <h2 className="text-center text-lg tracking-wide text-muted-foreground">
          השותפים שלנו
        </h2>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {partners.map((p) => (
            <li key={p.id}>
              {p.logo ? (
                <Image
                  src={p.logo || '/placeholder.svg'}
                  alt={p.name}
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="text-xl text-foreground/60">{p.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
