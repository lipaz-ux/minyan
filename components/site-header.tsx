'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, siteContent } from '@/lib/site-content'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between section-x md:h-40">
        {/* Wordmark (right side in RTL) */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-2xl leading-none tracking-tight text-foreground md:text-3xl"
          aria-label="מניין — לעמוד הבית"
        >
          מניין
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="ניווט ראשי">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/en"
            className="text-[15px] text-foreground/60 transition-colors hover:text-foreground"
          >
            English
          </Link>
          <a
            href={siteContent.donate.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display rounded-full border border-foreground px-4 py-1.5 text-[15px] text-foreground transition-colors hover:bg-foreground hover:text-ink"
          >
            {siteContent.donate.label}
          </a>
          <Link
            href="/events"
            className="font-display rounded-full border border-foreground px-4 py-1.5 text-[15px] text-foreground transition-colors hover:bg-foreground hover:text-ink"
          >
            לאירועים הקרובים
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="-me-2 inline-flex items-center justify-center p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden">
          <nav
            className="flex flex-col gap-1 border-t border-border bg-background px-6 pb-8 pt-4"
            aria-label="ניווט נייד"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-4 text-lg text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/en"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-4 text-lg text-foreground/70"
            >
              English
            </Link>
            <a
              href={siteContent.donate.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="py-4 text-lg text-foreground"
            >
              {siteContent.donate.label}
            </a>
            <Link
              href="/events"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-sm bg-foreground px-5 py-3.5 text-lg text-ink"
            >
              לאירועים הקרובים
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
