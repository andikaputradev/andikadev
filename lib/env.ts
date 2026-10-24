import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url('NEXT_PUBLIC_SITE_URL harus berupa URL yang valid (misalnya https://andikadev.com)')
    .default('https://andikadev.com'),
  NEXT_PUBLIC_GA_ID: z.string().optional().default('G-KPW9PV8X3X'),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_TO: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  INDEXNOW_KEY: z.string().optional(),
  GOOGLE_VERIFICATION_CODE: z.string().optional(),
  BING_VERIFICATION_CODE: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  const result = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_TO: process.env.EMAIL_TO,
    EMAIL_FROM: process.env.EMAIL_FROM,
    INDEXNOW_KEY: process.env.INDEXNOW_KEY,
    GOOGLE_VERIFICATION_CODE: process.env.GOOGLE_VERIFICATION_CODE,
    BING_VERIFICATION_CODE: process.env.BING_VERIFICATION_CODE,
  })

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n')
    const errorMessage = `Konfigurasi variabel lingkungan tidak valid:\n${issues}\nPeriksa berkas .env.local atau .env.example.`
    console.error(errorMessage)
    throw new Error(errorMessage)
  }

  return result.data
}

export const env = validateEnv()
