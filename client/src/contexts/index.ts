import AuthContext from './authContext.tsx'
import { useContext } from 'react'

export const useAuth = () => {
  return useContext(AuthContext)
}