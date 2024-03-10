export const getPerformanceColor = (performance: string | number): string => {
  if (typeof performance === 'string') {
    return 'var(--primary-600)'
  } else {
    return performance >= 50 ? 'green' : 'red'
  }
}
