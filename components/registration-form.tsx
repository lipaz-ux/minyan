'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerForEvent } from '@/app/actions'
import { formatPrice } from '@/lib/types'
import type { EventRecord } from '@/lib/types'

export function RegistrationForm({
  event,
  waitlist,
}: {
  event: EventRecord
  waitlist: boolean
}) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const paid = event.price > 0 && !waitlist
  const total = event.price * quantity

  async function onSubmit(formData: FormData) {
    setSubmitting(true)
    setError(null)
    const result = await registerForEvent({
      eventId: event.id,
      eventSlug: event.slug,
      firstName: String(formData.get('first_name') || ''),
      lastName: String(formData.get('last_name') || ''),
      phone: String(formData.get('phone') || ''),
      email: String(formData.get('email') || ''),
      quantity: Number(formData.get('quantity') || 1),
      heardAbout: String(formData.get('heard_about') || ''),
      notes: String(formData.get('notes') || ''),
      couponCode: String(formData.get('coupon_code') || ''),
      marketingOptIn: formData.get('marketing_opt_in') === 'on',
      waitlist,
      source: 'website',
    })

    if (!result.ok) {
      setError(result.message ?? 'משהו השתבש. נסו שוב.')
      setSubmitting(false)
      return
    }

    // Paid events (brief §28): architecture routes to payment before
    // confirmation. With no live provider yet, we go straight to the
    // confirmation with a pending flag the payment step will later set.
    router.push(`/register/${event.slug}/confirmation?rid=${result.registrationId}`)
  }

  return (
    <form action={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="first_name" label="שם פרטי" required />
        <Field name="last_name" label="שם משפחה" required />
        <Field name="phone" label="טלפון" type="tel" required inputMode="tel" />
        <Field name="email" label="אימייל" type="email" required inputMode="email" />
      </div>

      <div className="max-w-[12rem]">
        <label htmlFor="quantity" className="block text-sm text-muted-foreground">
          מספר משתתפים
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          max={10}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
          className="mt-2 w-full border border-border bg-background px-4 py-3 text-lg text-foreground outline-none focus:border-foreground"
        />
      </div>

      <Field name="heard_about" label="איך שמעת עלינו? (לא חובה)" />
      <Field name="notes" label="הערות (לא חובה)" />
      {paid && <Field name="coupon_code" label="קוד קופון (לא חובה)" />}

      <label className="flex items-start gap-3 pt-2">
        <input
          type="checkbox"
          name="marketing_opt_in"
          className="mt-1 size-5 shrink-0 accent-[var(--ink)]"
        />
        <span className="text-pretty leading-relaxed text-foreground/90">
          אשמח לקבל עדכונים על אירועים נוספים של מניין
        </span>
      </label>

      {error && (
        <p role="alert" className="text-accent">
          {error}
        </p>
      )}

      {paid && (
        <div className="flex items-center justify-between border-t border-border pt-5 text-lg">
          <span className="text-muted-foreground">סה״כ לתשלום</span>
          <span className="text-foreground">{formatPrice(total)}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-ink px-8 py-4 text-lg text-ink-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting
          ? 'רגע...'
          : waitlist
            ? 'הצטרפות לרשימת המתנה'
            : paid
              ? `למעבר לתשלום · ${formatPrice(total)}`
              : 'אישור הרשמה'}
      </button>

      {!waitlist && (
        <p className="text-center text-sm text-muted-foreground">
          אין צורך בחשבון או בסיסמה. ההרשמה לוקחת פחות מדקה.
        </p>
      )}
    </form>
  )
}

function Field({
  name,
  label,
  type = 'text',
  required,
  inputMode,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  inputMode?: 'text' | 'tel' | 'email'
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-muted-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        inputMode={inputMode}
        className="mt-2 w-full border border-border bg-background px-4 py-3 text-lg text-foreground outline-none focus:border-foreground"
      />
    </div>
  )
}
