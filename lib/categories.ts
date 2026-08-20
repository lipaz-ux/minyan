// Event categories. `slug` is the stable key stored on events + used in URLs
// (/events?category=shabbat). `label_he` is what the public site displays.
export type CategorySlug =
  | 'shabbat'
  | 'beit-midrash'
  | 'holidays'
  | 'gatherings'
  | 'workshops'
  | 'community'

export interface Category {
  slug: CategorySlug
  label_he: string
  label_en: string
}

export const CATEGORIES: Category[] = [
  { slug: 'shabbat', label_he: 'ארוחות שבת', label_en: 'Shabbat Meals' },
  { slug: 'beit-midrash', label_he: 'בית מדרש', label_en: 'Beit Midrash' },
  { slug: 'holidays', label_he: 'חגים ומועדים', label_en: 'Holidays' },
  { slug: 'gatherings', label_he: 'התכנסויות', label_en: 'Gatherings' },
  { slug: 'workshops', label_he: 'סדנאות', label_en: 'Workshops' },
  { slug: 'community', label_he: 'קהילה', label_en: 'Community' },
]

export function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label_he ?? slug
}
