// Pilihan kebutuhan layanan pada formulir kontak di /contact.
export const contactServices = [
  { id: 'website', label: 'Pembuatan website' },
  { id: 'aplikasi', label: 'Pembuatan aplikasi' },
  { id: 'playstore', label: 'Jasa upload aplikasi ke Play Store' },
  { id: 'keamanan-siber', label: 'Keamanan siber (defensif)' },
  { id: 'web3', label: 'Web3 dan blockchain' },
  { id: 'other', label: 'Lainnya' },
] as const

export type ContactServiceId = (typeof contactServices)[number]['id']

export function contactHref(service: ContactServiceId): string {
  return `/contact?service=${service}#contact-form`
}

export function contactServiceLabel(id: string | null | undefined): string | undefined {
  return contactServices.find((service) => service.id === id)?.label
}
