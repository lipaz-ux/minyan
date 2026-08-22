'use client'

import { useActionState } from 'react'
import { submitContactLead, type ActionResult } from '@/app/actions'

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    submitContactLead,
    null,
  )

  if (state?.ok) {
    return (
      <p className="text-xl text-accent">{state.message}</p>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="שם מלא" required />
        <Field name="organization" label="ארגון / חברה (לא חובה)" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="email" label="אימייל" type="email" required inputMode="email" />
        <Field name="phone" label="טלפון (לא חובה)" type="tel" inputMode="tel" />
      </div>

      <div>
        <label htmlFor="collaboration_type" className="block text-sm text-muted-foreground">
          סוג הפנייה (לא חובה)
        </label>
        <select
          id="collaboration_type"
          name="collaboration_type"
          className="mt-2 w-full border border-border bg-background px-4 py-3 text-lg text-foreground outline-none focus:border-foreground"
          defaultValue=""
        >
          <option value="">בחרו אפשרות</option>
          <option value="event">ארוחה / אירוע פרטי</option>
          <option value="workshop">שעת השראה / סדנה לארגון</option>
          <option value="partnership">שיתוף פעולה</option>
          <option value="other">אחר</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-muted-foreground">
          הודעה
          <span className="text-accent"> *</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full border border-border bg-background px-4 py-3 text-lg text-foreground outline-none focus:border-foreground"
        />
      </div>

      {state && !state.ok && (
        <p role="alert" className="text-accent">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-ink px-8 py-4 text-lg text-ink-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {pending ? 'שולח...' : 'שליחה'}
      </button>
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
