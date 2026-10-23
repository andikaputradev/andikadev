import { z } from 'zod'

// Pilihan kebutuhan layanan pada formulir kontak di /kontak
export const contactServices = [
  { id: 'website', label: 'Pembuatan website' },
  { id: 'aplikasi', label: 'Pembuatan aplikasi' },
  { id: 'playstore', label: 'Jasa upload aplikasi ke Play Store' },
  { id: 'keamanan-siber', label: 'Keamanan siber (defensif)' },
  { id: 'web3', label: 'Web3 dan blockchain' },
  { id: 'other', label: 'Lainnya' },
] as const

export const contactServiceIds = [
  'website',
  'aplikasi',
  'playstore',
  'keamanan-siber',
  'web3',
  'other',
] as const

export type ContactServiceId = (typeof contactServices)[number]['id']

// Skema validasi formulir kontak dengan Zod
export const contactFormSchema = z.object({
  name: z
    .string({ message: 'Nama lengkap wajib diisi.' })
    .trim()
    .min(2, { message: 'Nama harus memiliki panjang minimal 2 karakter.' })
    .max(100, { message: 'Nama tidak boleh melebihi 100 karakter.' }),
  email: z
    .string({ message: 'Alamat email wajib diisi.' })
    .trim()
    .email({ message: 'Alamat email tidak valid. Masukkan format email yang benar.' }),
  message: z
    .string({ message: 'Detail kebutuhan wajib diisi.' })
    .trim()
    .min(10, { message: 'Pesan kebutuhan minimal 10 karakter.' })
    .max(5000, { message: 'Pesan kebutuhan tidak boleh melebihi 5000 karakter.' }),
  service: z.enum(contactServiceIds, {
    message: 'Pilih layanan dari daftar yang tersedia.',
  }),
  website_trap: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Membersihkan karakter CR (\r) dan LF (\n) dari nilai header email untuk mencegah header injection
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

// Nomor WhatsApp resmi pengembang
export const OFFICIAL_WHATSAPP_NUMBER = '6287730139582' as const

// Pembentuk URL WhatsApp dengan pesan yang di-encode secara aman
export function buildWhatsAppUrl(customMessage?: string): string {
  const baseMessage =
    customMessage ||
    'Halo Wahyu Andika Putra, saya ingin berkonsultasi mengenai kebutuhan proyek.'
  const cleanMessage = sanitizeHeaderValue(baseMessage)
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(cleanMessage)}`
}

export function contactHref(service: ContactServiceId): string {
  return `/kontak?service=${service}#contact-form`
}

export function contactServiceLabel(id: string | null | undefined): string | undefined {
  return contactServices.find((service) => service.id === id)?.label
}
