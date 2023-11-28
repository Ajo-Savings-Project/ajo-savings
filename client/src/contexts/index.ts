import { useContext } from 'react'
import AuthContext from './authContext.tsx'

export const useAuth = () => {
  return useContext(AuthContext)
}
