export const jwtDecode = <T>(
  token: string
): { data: T; isExpired: boolean } => {
  try {
    const base64Url = token.split('.')[1] // get the payload part
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    //TODO: Implement isExpired
    return { data: JSON.parse(jsonPayload) as T, isExpired: false }
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return { data: null as T, isExpired: true }
  }
}
