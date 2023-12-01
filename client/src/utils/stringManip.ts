interface PluralizeOptions {
  showCount?: boolean
}

export function pluralize(
  count: number,
  singular: string,
  irregularPlural?: string,
  options?: PluralizeOptions
) {
  const result = count > 1 ? irregularPlural ?? `${singular}s` : singular
  if (options?.showCount) return `${count} ${result}`
  return result
}

export const stringToSentenceCase = (str: string) => {
  return str.replace(/\.\s+([a-z])[^.]|^(\s*[a-z])[^.]/g, (s) =>
    s.replace(/([a-z])/, (v) => v.toUpperCase())
  )
}

export const capitalizeWord = (word: string) =>
  word.replace(/\b\w/g, (match) => match.toUpperCase())

export function generateRandomCharacters(length: number = 10) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}
