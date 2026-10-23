import { productionAbsoluteUrl } from './config'

export const translationPairs: ReadonlyArray<{ en: string; id: string }> = []

export function languageAlternates(path: string): Record<string, string> | undefined {
  const pair = translationPairs.find((p) => p.en === path || p.id === path)
  if (!pair) return undefined
  return {
    en: productionAbsoluteUrl(pair.en),
    id: productionAbsoluteUrl(pair.id),
    'x-default': productionAbsoluteUrl(pair.id),
  }
}
