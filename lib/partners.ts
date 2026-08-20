import type { Partner } from './types'

// Partners (brief §53). Minimal, text-first treatment. Replace with the
// `partners` table (name + logo) once Supabase is connected and real logos
// are uploaded.
export const PARTNERS: Partner[] = [
  { id: 'p1', name: 'עיריית תל אביב-יפו', order: 1, active: true },
  { id: 'p2', name: 'בית אבי חי', order: 2, active: true },
  { id: 'p3', name: 'קרן שוסטרמן', order: 3, active: true },
  { id: 'p4', name: 'המדרשה', order: 4, active: true },
  { id: 'p5', name: 'קהילת ת"א', order: 5, active: true },
]

export function getActivePartners(): Partner[] {
  return PARTNERS.filter((p) => p.active).sort((a, b) => a.order - b.order)
}
