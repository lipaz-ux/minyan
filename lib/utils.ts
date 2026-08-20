import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Store phone numbers consistently so returning-participant matching (brief
// §24) and future WhatsApp integrations (brief §49) work reliably. Keeps a
// leading + and digits only (e.g. "050-123 4567" -> "0501234567").
export function normalizePhone(input: string): string {
  const trimmed = input.trim()
  const hasPlus = trimmed.startsWith('+')
  const digits = trimmed.replace(/\D/g, '')
  return hasPlus ? `+${digits}` : digits
}
