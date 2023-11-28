import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use(
  (req) => req,
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default request
