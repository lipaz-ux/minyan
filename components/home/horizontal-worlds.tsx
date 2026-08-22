'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { siteContent } from '@/lib/site-content'

type Slide = {
  key: string
  image: string
  kicker: string | null
  title: string
  body: string
  footer: string | null
  cta: { label: string; href: string } | null
}

const slides: Slide[] = [
  {
    key: 'what-we-do',
    image: '/images/section-whatwedo-bg.jpg',
    kicker: null,
    title: siteContent.whatWeDo.title,
    body: `${siteContent.whatWeDo.lead} ${siteContent.whatWeDo.body}`,
    footer: siteContent.whatWeDo.signoff,
    cta: null,
  },
  ...siteContent.worlds.map((world) => ({
    key: world.title,
    image: world.image,
    kicker: world.source,
    title: world.title,
    body: world.body,
    footer: null,
    cta: world.cta,
  })),
]

export function HorizontalWorlds() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const wrapper = wrapperRef.current
        const sticky = stickyRef.current
        const track = trackRef.current
        if (!wrapper || !sticky || !track) return
        const rect = wrapper.getBoundingClientRect()
        const total = wrapper.offsetHeight - sticky.offsetHeight
        const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
        track.style.transform = `translateX(-${progress * (slides.length - 1) * 100}%)`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={wrapperRef}
      className="relative hidden md:block"
      style={{ height: `${slides.length * 80}vh` }}
    >
      <div ref={stickyRef} className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div ref={trackRef} dir="ltr" className="flex h-full w-full will-change-transform">
          {slides.map((slide) => (
            <div key={slide.key} dir="rtl" className="relative h-full w-full shrink-0">
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/20" />
              <div className="relative z-10 flex h-full items-center">
                <div className="mx-auto w-full max-w-4xl section-x text-center">
                  {slide.kicker && (
                    <p className="text-lg leading-relaxed text-ink-foreground/90 md:text-xl">
                      {slide.kicker}
                    </p>
                  )}
                  <h2 className="font-display mt-3 text-balance text-3xl text-ink-foreground md:text-5xl">
                    {slide.title}
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink-foreground/80 md:text-lg">
                    {slide.body}
                  </p>
                  {slide.footer && (
                    <p className="font-display mt-5 text-2xl text-cream md:text-3xl">
                      {slide.footer}
                    </p>
                  )}
                  {slide.cta && (
                    <Link
                      href={slide.cta.href}
                      className="font-display mt-6 inline-flex items-center justify-center rounded-full border border-cream px-6 py-3 text-lg text-cream transition-colors hover:bg-cream hover:text-ink"
                    >
                      {slide.cta.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
