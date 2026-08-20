import type { CategorySlug } from './categories'

// ---------------------------------------------------------------------------
// Phase 1 domain model (brief §60). These types map 1:1 to the Supabase tables
// that will back the platform once the database is connected. All content
// entities are bilingual-ready (title_he / title_en) per brief §4, even though
// only Hebrew is built now.
// ---------------------------------------------------------------------------

export type EventStatus =
  | 'draft'
  | 'published'
  | 'sold_out'
  | 'cancelled'
  | 'completed'

export type RegistrationType = 'internal' | 'external'

export interface EventRecord {
  id: string
  title_he: string
  title_en?: string
  slug: string
  short_description_he: string
  short_description_en?: string
  full_description_he: string
  full_description_en?: string
  hero_image: string
  gallery?: string[]
  category: CategorySlug
  tags?: string[]
  start_date: string // ISO date
  end_date?: string
  doors_open?: string
  start_time?: string
  end_time?: string
  location_name: string
  address?: string
  city?: string
  google_maps_url?: string
  capacity?: number
  price: number // ILS; 0 = free
  early_bird_price?: number
  registration_type: RegistrationType
  external_registration_url?: string
  internal_registration_enabled: boolean
  series_id?: string
  facilitator?: string
  collaborators?: string[]
  status: EventStatus
  featured?: boolean
  show_remaining_capacity?: boolean
  seo_title?: string
  meta_description?: string
  og_image?: string
  // aggregate, computed from registrations
  confirmed_quantity?: number
  created_at?: string
  updated_at?: string
}

export type PaymentStatus =
  | 'free'
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'paid_externally'
  | 'complimentary'

export type RegistrationStatus =
  | 'registered'
  | 'waitlist'
  | 'cancelled'
  | 'refunded'

export type AttendanceStatus = 'unknown' | 'attended' | 'no_show' | 'cancelled'

export type RegistrationSource =
  | 'website'
  | 'instagram'
  | 'whatsapp'
  | 'newsletter'
  | 'partner'
  | 'admin'
  | 'direct'

export interface EventRegistration {
  id: string
  event_id: string
  community_contact_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  quantity: number
  registration_date: string
  amount: number
  amount_paid: number
  payment_status: PaymentStatus
  registration_status: RegistrationStatus
  attendance_status: AttendanceStatus
  coupon_code?: string
  marketing_opt_in: boolean
  source: RegistrationSource
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  notes?: string
  created_at?: string
}

export interface CommunityContact {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  first_registration_date?: string
  last_registration_date?: string
  total_registrations: number
  total_attended: number
  marketing_opt_in: boolean
  marketing_opt_in_date?: string
  source?: RegistrationSource
  tags?: string[]
  internal_notes?: string
  created_at?: string
  updated_at?: string
}

export interface EventSeries {
  id: string
  name_he: string
  name_en?: string
  slug: string
  description?: string
  image?: string
  category?: CategorySlug
  active: boolean
}

export interface Partner {
  id: string
  name: string
  logo?: string
  website?: string
  order: number
  active: boolean
}

export type ContactLeadStatus =
  | 'new'
  | 'contacted'
  | 'conversation'
  | 'closed'
  | 'archived'

export interface ContactLead {
  id: string
  name: string
  organization?: string
  phone?: string
  email: string
  collaboration_type?: string
  message: string
  source?: string
  status: ContactLeadStatus
  created_at?: string
}

// Payload collected by the public registration form (before we resolve or
// create a CommunityContact behind the scenes, brief §24).
export interface RegistrationFormData {
  first_name: string
  last_name: string
  phone: string
  email: string
  quantity: number
  heard_about?: string
  notes?: string
  coupon_code?: string
  marketing_opt_in: boolean
}
