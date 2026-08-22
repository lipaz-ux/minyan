'use client'

import { useEffect, useRef, useState } from 'react'
import { siteContent } from '@/lib/site-content'

export function VisionStatement() {
  const { vision } = siteContent
  const ref = useRef<HTMLParagraphElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-2xl section-x py-16 text-center md:py-24">
        <p
          ref={ref}
          className={`text-balance text-3xl leading-snug text-foreground transition-all duration-700 ease-out md:text-4xl lg:text-5xl ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          {vision.lead}
        </p>
      </div>
    </section>
  )
}
