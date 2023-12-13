import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://add.env.file',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

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
  (error) => {
    console.log('response error', error)
    return Promise.reject(error)
  }
)

export default request
