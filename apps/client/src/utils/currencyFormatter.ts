export function formatCurrency(input: number): string {
  const formattedCurrency = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(Math.abs(input))

  if (input < 0) {
    return `-${formattedCurrency}`
  }

  return `${formattedCurrency}`
}
