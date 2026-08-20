'use client'

import { useActionState } from 'react'
import { subscribeNewsletter, type ActionResult } from '@/app/actions'
import { siteContent } from '@/lib/site-content'

export function NewsletterSignup() {
  const { newsletter } = siteContent
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    subscribeNewsletter,
    null,
  )

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-3xl section-x py-20 text-center md:py-28">
        <h2 className="font-display text-balance text-4xl text-foreground md:text-5xl">
          {newsletter.title}
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {newsletter.body}
        </p>

        {state?.ok ? (
          <p className="mt-10 text-xl text-accent">{state.message}</p>
        ) : (
          <form action={formAction} className="mx-auto mt-10 flex max-w-xl flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 text-start">
                <label htmlFor="nl-name" className="sr-only">
                  שם
                </label>
                <input
                  id="nl-name"
                  name="name"
                  type="text"
                  required
                  placeholder="שם"
                  className="w-full rounded-sm border border-input bg-card px-4 py-3 text-foreground outline-none focus:border-accent"
                />
              </div>
              <div className="flex-1 text-start">
                <label htmlFor="nl-email" className="sr-only">
                  אימייל
                </label>
                <input
                  id="nl-email"
                  name="email"
                  type="email"
                  required
                  placeholder="אימייל"
                  className="w-full rounded-sm border border-input bg-card px-4 py-3 text-foreground outline-none focus:border-accent"
                />
              </div>
            </div>
            <div className="text-start">
              <label htmlFor="nl-phone" className="sr-only">
                טלפון (לא חובה)
              </label>
              <input
                id="nl-phone"
                name="phone"
                type="tel"
                placeholder="טלפון (לא חובה)"
                className="w-full rounded-sm border border-input bg-card px-4 py-3 text-foreground outline-none focus:border-accent"
              />
            </div>

            <label className="flex items-start gap-3 text-start text-sm text-muted-foreground">
              <input
                type="checkbox"
                name="consent"
                className="mt-1 size-4 shrink-0 accent-[var(--accent)]"
              />
              <span>{newsletter.consentLabel}</span>
            </label>

            {state && !state.ok && (
              <p className="text-start text-sm text-destructive">{state.message}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-foreground px-7 py-3.5 text-lg text-ink-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
            >
              {pending ? 'רגע...' : 'הרשמה'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
