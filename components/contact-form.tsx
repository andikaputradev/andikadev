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
  const searchParams = useSearchParams()
  const requested = searchParams.get('service')
  const defaultService = contactServices.some((service) => service.id === requested) ? requested! : ''

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
        return
      }

      setSuccess(true)
      formRef.current?.reset()
    })
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4 rounded-lg border bg-card p-6">
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
          <input id="name" name="name" type="text" required autoComplete="name" className={`${fieldClass} h-10`} />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className={labelClass}>
            Alamat email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={`${fieldClass} h-10`} />
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
          placeholder="Jelaskan kebutuhan aplikasi, website, sistem yang ingin dibangun, atau target waktu penyelesaian."
          className={`${fieldClass} min-h-[140px]`}
        />
      </div>

      {error && <div className="text-sm text-destructive">{error}</div>}

      {success && (
        <div className="text-sm text-green-600">
          Pesan berhasil terkirim. Saya akan merespons dalam waktu 24 jam dengan langkah teknis berikutnya.
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {isPending ? 'Mengirim pesan...' : 'Kirim pesan'}
      </button>
      <p className="text-xs text-zinc-500">
        Saya memberikan evaluasi teknis yang jujur dan langsung mengenai kesesuaian solusi.
      </p>
    </form>
  )
}
