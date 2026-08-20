import Link from 'next/link'
import { Mail } from 'lucide-react'
import { siteContent } from '@/lib/site-content'

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

const footerLinks = [
  { label: 'אירועים', href: '/events' },
  { label: 'עלינו', href: '/#about' },
  { label: 'צרו קשר', href: '/contact' },
  { label: 'תקנון', href: '/regulations' },
  { label: 'מדיניות פרטיות', href: '/privacy' },
]

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl section-x py-16 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-4xl leading-none md:text-5xl">מניין</p>
            <p className="mt-5 text-pretty leading-relaxed text-ink-foreground/70">
              בית לתרבות ויצירה יהודית בועטת בתל אביב.
            </p>
            <div className="mt-6 flex items-center gap-5">
              <a
                href={siteContent.brand.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-ink-foreground/70 transition-colors hover:text-ink-foreground"
              >
                <InstagramGlyph className="size-5" />
                <span className="sr-only">אינסטגרם</span>
              </a>
              <a
                href={`mailto:${siteContent.brand.email}`}
                className="inline-flex items-center gap-2 text-ink-foreground/70 transition-colors hover:text-ink-foreground"
              >
                <Mail className="size-5" />
                <span>{siteContent.brand.email}</span>
              </a>
            </div>
          </div>

          <nav aria-label="ניווט תחתון">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-foreground/70 transition-colors hover:text-ink-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ink-foreground/15 pt-6 text-sm text-ink-foreground/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} מניין. כל הזכויות שמורות.</p>
          <p>עמותה לתרבות יהודית · תל אביב-יפו</p>
        </div>
      </div>
    </footer>
  )
}
