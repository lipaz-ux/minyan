'use server'

// ---------------------------------------------------------------------------
// Server actions for the public site. These are the single integration seam
// for persistence. Right now they validate input and simulate success; when
// Supabase is connected, replace the marked "TODO(supabase)" blocks with real
// inserts/queries. The returned shapes should stay the same so the client
// forms don't change.
// ---------------------------------------------------------------------------

import type { RegistrationSource } from '@/lib/types'
import { normalizePhone } from '@/lib/utils'

export interface ActionResult {
  ok: boolean
  message: string
  registrationId?: string
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export async function subscribeNewsletter(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = normalizePhone(String(formData.get('phone') ?? ''))
  const consent = formData.get('consent') === 'on'

  if (!name) return { ok: false, message: 'נא להזין שם' }
  if (!isEmail(email)) return { ok: false, message: 'נא להזין כתובת אימייל תקינה' }
  if (!consent)
    return { ok: false, message: 'יש לאשר קבלת עדכונים כדי להירשם לרשימה' }

  // TODO(supabase): upsert into community_contacts by email/phone, set
  // marketing_opt_in = true, marketing_opt_in_date = now(), source = 'newsletter'.
  console.log('[v0] newsletter signup', { name, email, phone, consent })

  return { ok: true, message: 'תודה! נעדכן אתכם על האירועים הקרובים.' }
}

export async function submitContactLead(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name) return { ok: false, message: 'נא להזין שם' }
  if (!isEmail(email)) return { ok: false, message: 'נא להזין כתובת אימייל תקינה' }
  if (message.length < 5) return { ok: false, message: 'נא לכתוב הודעה קצרה' }

  // TODO(supabase): insert into contact_leads with status = 'new'.
  console.log('[v0] contact lead', Object.fromEntries(formData.entries()))

  return { ok: true, message: 'תודה! נחזור אליכם בהקדם.' }
}

export interface RegisterInput {
  eventId: string
  eventSlug: string
  firstName: string
  lastName: string
  phone: string
  email: string
  quantity: number
  heardAbout?: string
  notes?: string
  couponCode?: string
  marketingOptIn: boolean
  waitlist?: boolean
  source?: RegistrationSource
  utm?: Record<string, string | undefined>
}

export async function registerForEvent(input: RegisterInput): Promise<ActionResult> {
  if (!input.firstName.trim() || !input.lastName.trim())
    return { ok: false, message: 'נא להזין שם פרטי ושם משפחה' }
  if (!isEmail(input.email))
    return { ok: false, message: 'נא להזין כתובת אימייל תקינה' }
  if (normalizePhone(input.phone).length < 9)
    return { ok: false, message: 'נא להזין מספר טלפון תקין' }
  if (!Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > 10)
    return { ok: false, message: 'מספר משתתפים לא תקין' }

  // TODO(supabase):
  //  1. Find community_contact by email OR normalized phone (brief §24).
  //  2. If none, insert a new community_contact silently.
  //  3. Insert event_registration linked to that contact with the right
  //     registration_status (registered | waitlist) and payment_status
  //     (free when price = 0, otherwise pending until payment succeeds).
  //  4. Re-check capacity server-side before confirming (brief §30).
  console.log('[v0] event registration', input)

  const registrationId = `reg_${Math.random().toString(36).slice(2, 10)}`
  return {
    ok: true,
    message: input.waitlist ? 'נרשמת לרשימת ההמתנה' : 'נרשמת בהצלחה',
    registrationId,
  }
}
