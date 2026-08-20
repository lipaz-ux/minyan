import Link from 'next/link'
import { isSoldOut } from '@/lib/events'
import { formatPrice } from '@/lib/types'
import type { EventRecord } from '@/lib/types'
import { cn } from '@/lib/utils'

export function EventRegistrationCta({
  event,
  variant,
}: {
  event: EventRecord
  variant: 'inline' | 'sticky-mobile'
}) {
  const soldOut = isSoldOut(event)
  const external =
    event.registration_type === 'external' && event.external_registration_url

  // External registration links out to the current provider (brief §17).
  const href = external
    ? event.external_registration_url!
    : soldOut
      ? `/register/${event.slug}?waitlist=1`
      : `/register/${event.slug}`

  const label = soldOut ? 'להצטרפות לרשימת המתנה' : 'להרשמה'
  const priceLabel = formatPrice(event.price)
  const showPrice = event.price > 0 && !soldOut

  if (variant === 'sticky-mobile') {
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-3">
          {showPrice && (
            <span className="shrink-0 text-lg text-foreground">{priceLabel}</span>
          )}
          <CtaLink href={href} external={!!external} className="flex-1 text-center">
            {label}
          </CtaLink>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <CtaLink href={href} external={!!external}>
        {label}
      </CtaLink>
      {soldOut && (
        <p className="text-muted-foreground">האירוע מלא — נשמח לראותכם בהמתנה.</p>
      )}
    </div>
  )
}

function CtaLink({
  href,
  external,
  className,
  children,
}: {
  href: string
  external: boolean
  className?: string
  children: React.ReactNode
}) {
  const classes = cn(
    'inline-flex items-center justify-center bg-ink px-8 py-3 text-lg text-ink-foreground transition-opacity hover:opacity-90',
    className,
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
