import { decodeHtmlEntities, stripHtml } from './utils'

const RANK_MATH_TEMPLATE = /%[a-z0-9_-]+%/i

/** Suffix merek yang ditambahkan di fitTitle; hapus agar tidak ganda. */
const BRAND_SUFFIX =
  /\s*(?:[|·]|(?:\s-\s))(?:\s*)?(?:Andika Putra Dev|AndikaDev|Wahyu Andika Putra)\s*$/i

export function hasRankMathTemplateTokens(value: string): boolean {
  return RANK_MATH_TEMPLATE.test(value)
}

export function cleanRankMathValue(raw: string): string {
  return decodeHtmlEntities(stripHtml(raw)).replace(/\s+/g, ' ').trim()
}

function stripEmbeddedBrandSuffix(title: string): string {
  let result = title
  while (BRAND_SUFFIX.test(result)) {
    result = result.replace(BRAND_SUFFIX, '')
  }
  return result.trim()
}

/**
 * Returns a usable Rank Math SEO string, or undefined when empty, template-only, or missing.
 * Unresolved Rank Math placeholders (e.g. %title%, %sep%) fall back to default metadata.
 */
export function resolveRankMathSeoValue(raw: string | undefined | null): string | undefined {
  if (raw == null) return undefined
  const cleaned = cleanRankMathValue(raw)
  if (!cleaned || hasRankMathTemplateTokens(cleaned)) return undefined
  return cleaned
}

export function resolveRankMathSeoTitle(raw: string | undefined | null): string | undefined {
  const resolved = resolveRankMathSeoValue(raw)
  if (!resolved) return undefined
  const stripped = stripEmbeddedBrandSuffix(resolved)
  return stripped || undefined
}

export interface BlogRankMathInput {
  rank_math_title?: string | null
  rank_math_description?: string | null
  /** Rank Math Facebook / Open Graph description (`rank_math_facebook_description`). */
  rank_math_facebook_description?: string | null
  rank_math_seo?: {
    title?: string | null
    description?: string | null
  } | null
}

export function pickRankMathTitle(input: BlogRankMathInput): string | undefined {
  return (
    resolveRankMathSeoTitle(input.rank_math_title) ??
    resolveRankMathSeoTitle(input.rank_math_seo?.title)
  )
}

export function pickRankMathDescription(input: BlogRankMathInput): string | undefined {
  return (
    resolveRankMathSeoValue(input.rank_math_description) ??
    resolveRankMathSeoValue(input.rank_math_facebook_description) ??
    resolveRankMathSeoValue(input.rank_math_seo?.description)
  )
}

/** Rantai Rank Math ditambah excerpt fallback ketika field Rank Math kosong. */
export function pickBlogMetaDescription(
  input: BlogRankMathInput,
  excerptRendered: string,
): string | undefined {
  return pickRankMathDescription(input) ?? resolveRankMathSeoValue(stripHtml(excerptRendered))
}
