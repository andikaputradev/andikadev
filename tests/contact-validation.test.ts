import { describe, expect, it } from 'vitest'
import {
  contactFormSchema,
  contactServices,
  contactServiceIds,
  sanitizeHeaderValue,
  buildWhatsAppUrl,
  OFFICIAL_WHATSAPP_NUMBER,
  contactServiceLabel,
} from '@/lib/contact-services'

describe('contactFormSchema', () => {
  const validPayload = {
    name: 'Budi Santoso',
    email: 'budi@example.com',
    message: 'Saya ingin membuat website company profile untuk bisnis di Semarang.',
    service: 'website' as const,
    website_trap: '',
  }

  it('menerima data formulir yang valid', () => {
    const result = contactFormSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Budi Santoso')
      expect(result.data.email).toBe('budi@example.com')
      expect(result.data.service).toBe('website')
    }
  })

  it('menerima seluruh layanan yang terdaftar dalam contactServiceIds', () => {
    for (const serviceId of contactServiceIds) {
      const result = contactFormSchema.safeParse({
        ...validPayload,
        service: serviceId,
      })
      expect(result.success).toBe(true)
    }
  })

  it('menolak nama yang kurang dari 2 karakter', () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      name: 'A',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('name'))
      expect(issue).toBeDefined()
      expect(issue?.message).toContain('minimal 2 karakter')
    }
  })

  it('menolak nama yang lebih dari 100 karakter', () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      name: 'A'.repeat(101),
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('name'))
      expect(issue).toBeDefined()
      expect(issue?.message).toContain('100 karakter')
    }
  })

  it('menolak alamat email yang formatnya tidak valid', () => {
    const invalidEmails = ['invalid', 'budi@', 'budi@domain', 'budi.com', '@domain.com']
    for (const email of invalidEmails) {
      const result = contactFormSchema.safeParse({
        ...validPayload,
        email,
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const issue = result.error.issues.find((i) => i.path.includes('email'))
        expect(issue).toBeDefined()
      }
    }
  })

  it('menolak pesan yang kurang dari 10 karakter', () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      message: 'Halo mas',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('message'))
      expect(issue).toBeDefined()
      expect(issue?.message).toContain('minimal 10 karakter')
    }
  })

  it('menolak pesan yang lebih dari 5000 karakter', () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      message: 'x'.repeat(5001),
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('message'))
      expect(issue).toBeDefined()
      expect(issue?.message).toContain('5000 karakter')
    }
  })

  it('menolak layanan yang tidak ada dalam daftar tetap', () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      service: 'layanan-palsu',
    })
    expect(result.success).toBe(false)
  })

  it('mengizinkan honeypot website_trap kosong maupun terisi string', () => {
    const emptyTrap = contactFormSchema.safeParse({
      ...validPayload,
      website_trap: '',
    })
    expect(emptyTrap.success).toBe(true)

    const filledTrap = contactFormSchema.safeParse({
      ...validPayload,
      website_trap: 'https://spam-bot.example.com',
    })
    expect(filledTrap.success).toBe(true)
  })
})

describe('sanitizeHeaderValue', () => {
  it('menghapus karakter CR (\\r) dan LF (\\n) serta melakukan trim', () => {
    const untrusted = 'Subjek dengan CRLF\r\nBcc: hacker@example.com\nBaris baru\r'
    const clean = sanitizeHeaderValue(untrusted)
    expect(clean).not.toContain('\r')
    expect(clean).not.toContain('\n')
    expect(clean).toBe('Subjek dengan CRLF Bcc: hacker@example.com Baris baru')
  })

  it('menangani string bersih tanpa perubahan kecuali trim', () => {
    const clean = sanitizeHeaderValue('   Pembuatan website profil usaha   ')
    expect(clean).toBe('Pembuatan website profil usaha')
  })
})

describe('buildWhatsAppUrl', () => {
  it('menghasilkan tautan dengan nomor resmi dan pesan bawaan', () => {
    const url = buildWhatsAppUrl()
    expect(url).toContain(`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`)
    expect(url).toContain('text=')
    expect(url).toContain(encodeURIComponent('Halo Wahyu Andika Putra, saya ingin berkonsultasi mengenai kebutuhan proyek.'))
  })

  it('menghasilkan tautan dengan pesan kustom yang di-encode secara aman', () => {
    const custom = 'Halo Mas Andika, saya mau tanya soal jasa upload Play Store.'
    const url = buildWhatsAppUrl(custom)
    expect(url).toBe(`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(custom)}`)
  })

  it('membersihkan baris baru dari pesan sebelum pembentukan tautan', () => {
    const messageWithNewlines = 'Halo,\r\nSaya butuh konsultasi.\nTerima kasih.'
    const url = buildWhatsAppUrl(messageWithNewlines)
    expect(url).not.toContain('%0D')
    expect(url).not.toContain('%0A')
    expect(url).toContain(encodeURIComponent('Halo, Saya butuh konsultasi. Terima kasih.'))
  })
})

describe('contactServiceLabel dan contactServices', () => {
  it('memiliki tepat enam pilihan layanan', () => {
    expect(contactServices.length).toBe(6)
  })

  it('mengembalikan label yang benar berdasarkan id', () => {
    expect(contactServiceLabel('website')).toBe('Pembuatan website')
    expect(contactServiceLabel('playstore')).toBe('Jasa upload aplikasi ke Play Store')
    expect(contactServiceLabel('non-existent')).toBeUndefined()
  })
})
