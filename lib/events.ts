import type { EventRecord } from './types'
import type { CategorySlug } from './categories'

// ---------------------------------------------------------------------------
// Sample event data for Phase 1 UI. This is the ONLY place that knows where
// events come from. When Supabase is connected, replace the array + the
// synchronous getters below with async queries against the `events` table --
// the components consuming these helpers won't need to change shape.
// ---------------------------------------------------------------------------

const DAY = 24 * 60 * 60 * 1000
function iso(offsetDays: number): string {
  return new Date(Date.now() + offsetDays * DAY).toISOString().slice(0, 10)
}

export const EVENTS: EventRecord[] = [
  {
    id: 'evt-shabbat-armon',
    title_he: 'ארוחת שבת — ארמון בזמן',
    slug: 'armon-bazman-shabbat',
    short_description_he:
      'ארוחת שבת חגיגית בלוקיישן מיוחד בלב תל אביב, עם אוכל יוצא דופן, יין וניגונים.',
    full_description_he:
      'מניין מזמינים אתכם לחוות ארוחת שבת מסוג חדש. אפשר להגיע עם חברים או לבד, להיפגש איתנו בלוקיישן לא שגרתי בלב העיר, לטעום אוכל יוצא דופן, לנוח מהשבוע שהיה ולהכיר אנשים חדשים על כוס יין. חוויה שמשלבת בין קודש וחול, בין מזרח ומערב, ובין עיר למסורת.',
    hero_image: '/images/shabbat.png',
    category: 'shabbat',
    tags: ['שבת', 'ארוחה', 'קהילה'],
    start_date: iso(6),
    doors_open: '19:00',
    start_time: '19:30',
    location_name: 'סטודיו במרכז תל אביב',
    address: 'רחוב לילינבלום 20, תל אביב',
    city: 'תל אביב',
    google_maps_url: 'https://maps.google.com/?q=Lilienblum+20+Tel+Aviv',
    capacity: 40,
    price: 120,
    registration_type: 'internal',
    internal_registration_enabled: true,
    facilitator: 'ליפז אלה',
    status: 'published',
    featured: true,
    show_remaining_capacity: true,
    confirmed_quantity: 28,
  },
  {
    id: 'evt-beit-midrash-elul',
    title_he: 'בית מדרש — יש לך כנפי רוח',
    slug: 'beit-midrash-kanfei-ruach',
    short_description_he:
      'ערב לימוד וחברותא סביב טקסטים, שירים וסיפורים ששופכים אור על החיים בעיר.',
    full_description_he:
      'עם הספר מחפש משמעות, ואנחנו במניין מבקשים להעמיק בטקסטים, שירים וסיפורים ששופכים אור ומאתגרים את המציאות של העיר הגדולה. בית המדרש של מניין הוא הזדמנות לקרוא, לחשוב, ולהסתכל במראה דרך האותיות — לגלות את עצמנו בתוך טקסט קאנוני בן אלפיים שנה ולהתרגש משיר בן עשור, באותה המידה בדיוק.',
    hero_image: '/images/beit-midrash.png',
    category: 'beit-midrash',
    tags: ['לימוד', 'חברותא'],
    start_date: iso(13),
    doors_open: '20:00',
    start_time: '20:15',
    location_name: 'בית קהילתי, פלורנטין',
    address: 'רחוב פלורנטין 10, תל אביב',
    city: 'תל אביב',
    google_maps_url: 'https://maps.google.com/?q=Florentin+10+Tel+Aviv',
    capacity: 30,
    price: 0,
    registration_type: 'internal',
    internal_registration_enabled: true,
    facilitator: 'ליפז אלה',
    status: 'published',
    featured: true,
    show_remaining_capacity: false,
    confirmed_quantity: 12,
  },
  {
    id: 'evt-havdalah-rooftop',
    title_he: 'הבדלה על הגג — התכנסות רוח',
    slug: 'havdalah-rooftop',
    short_description_he:
      'טקס הבדלה אינטימי על גג בתל אביב, עם ניגונים, בשמים ונר מבדיל בין קודש לחול.',
    full_description_he:
      'מעגל השנה היהודי שזור ברגעים מקודשים. סביב צאת השבת אנחנו מתכנסים על הגג לטקס הבדלה אחר — עם אלמנטים של מסורת לצד מודרנה, ניגונים, בשמים ונר מבדיל. הזדמנות לעצור, להיזכר, ולהביא את המסורת היהודית בחזרה אל המרחב היום-יומי שלנו.',
    hero_image: '/images/event-havdalah.png',
    category: 'gatherings',
    tags: ['הבדלה', 'רוח'],
    start_date: iso(20),
    doors_open: '20:30',
    start_time: '21:00',
    location_name: 'גג בעיר, מרכז תל אביב',
    address: 'שדרות רוטשילד 45, תל אביב',
    city: 'תל אביב',
    google_maps_url: 'https://maps.google.com/?q=Rothschild+45+Tel+Aviv',
    capacity: 25,
    price: 60,
    registration_type: 'internal',
    internal_registration_enabled: true,
    facilitator: 'ליפז אלה',
    status: 'published',
    featured: false,
    show_remaining_capacity: true,
    confirmed_quantity: 25, // sold out
  },
  {
    id: 'evt-shabbat-past-1',
    title_he: 'ארוחת שבת — ליל קיץ',
    slug: 'shabbat-leil-kayitz',
    short_description_he:
      'ארוחת שבת קסומה בערב קיץ, שהתקיימה בחצר סוד בלב תל אביב.',
    full_description_he:
      'ערב שבת קסום שהתקיים בחצר נסתרת בלב העיר, עם שולחן ארוך, נרות, יין וניגונים עד השעות הקטנות של הלילה.',
    hero_image: '/images/hero-shabbat-table.png',
    gallery: ['/images/shabbat.png', '/images/hero-shabbat-table.png'],
    category: 'shabbat',
    start_date: iso(-24),
    start_time: '19:30',
    location_name: 'חצר נסתרת, נחלת בנימין',
    city: 'תל אביב',
    price: 120,
    registration_type: 'internal',
    internal_registration_enabled: false,
    status: 'completed',
    confirmed_quantity: 42,
  },
  {
    id: 'evt-gathering-past-1',
    title_he: 'התכנסות ראש חודש',
    slug: 'rosh-chodesh-gathering',
    short_description_he:
      'התכנסות רוח לציון ראש חודש, עם לימוד, שירה ומעגל שיח.',
    full_description_he:
      'התכנסנו לציון ראש חודש עם לימוד קצר, שירה במעגל ומעגל שיח על התחדשות. ערב של חיבור ושקט בתוך רעש העיר.',
    hero_image: '/images/gatherings.png',
    gallery: ['/images/gatherings.png'],
    category: 'gatherings',
    start_date: iso(-40),
    start_time: '20:00',
    location_name: 'בית קהילתי, פלורנטין',
    city: 'תל אביב',
    price: 0,
    registration_type: 'internal',
    internal_registration_enabled: false,
    status: 'completed',
    confirmed_quantity: 30,
  },
]

// --- Data access helpers (swap internals for Supabase later) ---------------

export function isPast(e: EventRecord): boolean {
  return e.status === 'completed' || new Date(e.start_date) < new Date(new Date().toDateString())
}

export function availableSpots(e: EventRecord): number | null {
  if (e.capacity == null) return null
  return Math.max(0, e.capacity - (e.confirmed_quantity ?? 0))
}

export function isSoldOut(e: EventRecord): boolean {
  if (e.status === 'sold_out') return true
  const spots = availableSpots(e)
  return spots !== null && spots <= 0
}

export function getPublishedUpcoming(): EventRecord[] {
  return EVENTS.filter((e) => e.status === 'published' && !isPast(e)).sort(
    (a, b) => +new Date(a.start_date) - +new Date(b.start_date),
  )
}

export function getPastEvents(): EventRecord[] {
  return EVENTS.filter((e) => isPast(e)).sort(
    (a, b) => +new Date(b.start_date) - +new Date(a.start_date),
  )
}

export function getFeatured(limit = 4): EventRecord[] {
  const upcoming = getPublishedUpcoming()
  const featured = upcoming.filter((e) => e.featured)
  return (featured.length ? featured : upcoming).slice(0, limit)
}

export function getByCategory(category: CategorySlug): EventRecord[] {
  return getPublishedUpcoming().filter((e) => e.category === category)
}

export function getEventBySlug(slug: string): EventRecord | undefined {
  return EVENTS.find((e) => e.slug === slug)
}

export function formatEventDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  })
}

export function formatEventDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
  })
}
