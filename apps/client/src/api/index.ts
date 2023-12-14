import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { appNotify } from '../components'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://add.env.file',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

interface AxiosRequestConfigExt extends AxiosRequestConfig {
  silent?: boolean
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
  (error: AxiosError<{ message: string }>) => {
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
              appNotify('error', error.response.data.message)
            }
            // TODO: log to server
            appNotify('error', 'Something went wrong')
          }
        }
        break
    }
    return Promise.reject(error)
  }
)

export const customReq = (config: AxiosRequestConfigExt) => {
  return request(config)
}

export default request
