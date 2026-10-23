'use client'

import { useRef, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { sendContactEmail } from '@/app/actions/contact'
import { contactServices } from '@/lib/contact-services'

const fieldClass =
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
const labelClass = 'text-sm font-medium leading-none'

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const requested = searchParams.get('service')
  const defaultService = contactServices.some((service) => service.id === requested)
    ? requested!
    : ''

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    setError(null)
    setSuccess(false)

    startTransition(async () => {
      const result = await sendContactEmail(formData)

      if (result.error) {
        setError(result.error)
        setTimeout(() => {
          statusRef.current?.focus()
        }, 50)
        return
      }

      setSuccess(true)
      formRef.current?.reset()
      setTimeout(() => {
        statusRef.current?.focus()
      }, 50)
    })
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4 rounded-lg border bg-card p-6">
      {/* Honeypot field tersembunyi untuk menyaring bot spam tanpa mengganggu pengguna nyata */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website_trap">Jangan isi bidang ini jika Anda manusia</label>
        <input
          id="website_trap"
          name="website_trap"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="service" className={labelClass}>
          Kebutuhan layanan
        </label>
        <select
          id="service"
          name="service"
          key={defaultService}
          defaultValue={defaultService}
          required
          aria-required="true"
          className={`${fieldClass} h-10`}
        >
          <option value="" disabled>
            Pilih layanan yang paling sesuai
          </option>
          {contactServices.map((service) => (
            <option key={service.id} value={service.id}>
              {service.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className={labelClass}>
            Nama lengkap
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            aria-required="true"
            autoComplete="name"
            className={`${fieldClass} h-10`}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className={labelClass}>
            Alamat email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            autoComplete="email"
            className={`${fieldClass} h-10`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className={labelClass}>
          Detail kebutuhan
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          placeholder="Jelaskan kebutuhan aplikasi, website, sistem yang ingin dibangun, atau target waktu penyelesaian."
          className={`${fieldClass} min-h-[140px]`}
        />
      </div>

      {/* Wilayah status formulir yang dapat diakses (aria-live) dengan fokus otomatis */}
      <div aria-live="polite" aria-atomic="true" className="space-y-2">
        {error && (
          <div
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive focus:outline-none focus:ring-2 focus:ring-destructive"
          >
            <p className="font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div
            ref={statusRef}
            tabIndex={-1}
            role="status"
            className="rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <p className="font-medium">Pesan berhasil terkirim.</p>
            <p className="mt-1 text-xs">
              Terima kasih telah menghubungi saya. Saya akan merespons dalam waktu 24 jam dengan ringkasan evaluasi dan langkah teknis berikutnya.
            </p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {isPending ? 'Mengirim formulir...' : 'Kirim formulir konsultasi'}
      </button>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Saya memberikan evaluasi teknis yang jujur dan langsung mengenai kesesuaian solusi.
      </p>
    </form>
  )
}
