import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { SESSION_COUNT_KEY } from '../appConstants'
import { appNotify } from '../components'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://add.env.file'

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

interface AxiosRequestConfigExt extends AxiosRequestConfig {
  silent?: boolean
}

const clearSession = () => {
  sessionStorage.clear()
  window.location.reload()
  return
}

request.interceptors.request.use(
  (req) => {
    console.log('req', req)
    return req
  },
  (error) => {
    console.log('req error', error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    console.log('response success', response)
    return response
  },
  async (error: AxiosError<{ message: string | string[]; code: string }>) => {
    switch (error.code) {
      case 'ERR_NETWORK':
        appNotify(
          'error',
          'Network error, please make sure you are connected to the internet.'
        )
        break
      default:
        // eslint-disable-next-line no-case-declarations
        const config = error.config as AxiosRequestConfigExt
        if (!config.silent) {
          if (error.response) {
            if (error.response.data.message) {
              let hideMsg = error.response.data.message
              hideMsg = typeof hideMsg === 'string' ? hideMsg : hideMsg[0]
              // don't show unauthorised messages
              if (!hideMsg.toLowerCase().includes('unauthorized')) {
                appNotify('error', error.response.data.message)
              }
            } else {
              // TODO: log to server
              appNotify('error', 'Something went wrong')
            }
          }
        }
        break
    }
    if (error?.response?.data?.code === 'JWT: Expired') {
      const sessionToken = sessionStorage.getItem(SESSION_COUNT_KEY)
      if (sessionToken) {
        try {
          const res = await axios({
            method: 'POST',
            baseURL: BASE_URL,
            url: '/users/token-refresh',
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${sessionToken}`,
              'Content-Type': 'application/json',
            },
          })
          if (error.config) {
            // Retry the original request with the new token
            error.config.headers['Authorization'] = `Bearer ${res.data.token}`
            sessionStorage.setItem(SESSION_COUNT_KEY, res.data.token as string)
            return request(error.config)
          }
        } catch (e) {
          return clearSession()
        }
      } else return clearSession()
    } else if (error?.response?.data?.code === 'JWT: Invalid') {
      return clearSession()
    }
    return Promise.reject(error)
  }
)

export const customRequest = (config: AxiosRequestConfigExt) => {
  return request(config)
}

export default request
