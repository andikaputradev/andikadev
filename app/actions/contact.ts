'use server'

import { Resend } from 'resend'
import {
  contactFormSchema,
  contactServiceLabel,
  sanitizeHeaderValue,
  type ContactFormData,
} from '@/lib/contact-services'

export interface ContactActionResult {
  success?: boolean
  error?: string
  fieldErrors?: Partial<Record<keyof ContactFormData, string[]>>
}

export async function sendContactEmail(formData: FormData): Promise<ContactActionResult> {
  try {
    const rawData = {
      name: formData.get('name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      message: formData.get('message')?.toString() ?? '',
      service: formData.get('service')?.toString() ?? '',
      website_trap: formData.get('website_trap')?.toString() ?? '',
    }

    const validationResult = contactFormSchema.safeParse(rawData)
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors
      const firstErrorMessage =
        validationResult.error.issues[0]?.message || 'Data formulir tidak valid.'
      return {
        error: firstErrorMessage,
        fieldErrors,
      }
    }

    const { name, email, message, service, website_trap } = validationResult.data

    // Perlindungan honeypot: jika input tersembunyi terisi oleh bot, hentikan pengiriman tanpa memunculkan error ke bot (silent drop)
    if (website_trap && website_trap.trim().length > 0) {
      return { success: true }
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return {
        error:
          'Layanan pengiriman formulir belum dikonfigurasi dengan Resend API. Silakan hubungi saya langsung lewat WhatsApp atau email.',
      }
    }

    const emailFrom = process.env.EMAIL_FROM
    if (!emailFrom || !emailFrom.trim()) {
      return {
        error:
          'Alamat pengirim email sistem (EMAIL_FROM) belum disetel di lingkungan. Silakan hubungi saya langsung lewat WhatsApp atau email.',
      }
    }

    const emailToEnv = process.env.EMAIL_TO || 'wahyuandikaputra.co.id@gmail.com'
    const recipients = emailToEnv
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean)

    if (recipients.length === 0) {
      return {
        error:
          'Alamat penerima email belum dikonfigurasi. Silakan hubungi saya langsung lewat WhatsApp.',
      }
    }

    const serviceLabel = contactServiceLabel(service) || 'Kebutuhan Umum'
    const cleanName = sanitizeHeaderValue(name)
    const cleanService = sanitizeHeaderValue(serviceLabel)

    // Subjek email dibersihkan dari CR dan LF untuk mencegah header injection
    const subject = `Konsultasi Proyek: ${cleanService} dari ${cleanName}`

    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from: emailFrom,
      to: recipients,
      replyTo: email,
      subject,
      text: `Kebutuhan Layanan: ${serviceLabel}\nNama Pengirim: ${name}\nAlamat Email: ${email}\n\nPesan Kebutuhan:\n${message}\n`,
    })

    if (result.error) {
      // Catat galat API tanpa mencatat data pribadi pemohon (nama/email/pesan)
      console.error('Resend delivery error:', result.error.message)
      return {
        error:
          'Gagal mengirim pesan melalui penyedia email. Silakan coba kembali beberapa saat lagi atau hubungi via WhatsApp.',
      }
    }

    return { success: true }
  } catch (err) {
    // Catat galat teknis tanpa mencatat data pribadi pemohon
    console.error(
      'Pengecualian teknis pada server action formulir kontak:',
      err instanceof Error ? err.message : 'Unknown error'
    )
    return {
      error: 'Terjadi kendala sistem saat memproses formulir. Silakan coba kembali atau hubungi via WhatsApp.',
    }
  }
}
