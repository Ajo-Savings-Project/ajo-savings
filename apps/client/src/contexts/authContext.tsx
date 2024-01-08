import { createContext, ReactNode, useState } from 'react'
import request from '../api'
import { SESSION_COUNT_KEY } from '../appConstants'

const contextValues = {
  isAuth: false,
  showAutoLogoutMessage: false,
  firstName: '',
  lastName: '',
  email: '',
  id: '',
}

type ContextValueT = typeof contextValues

interface AuthContextI extends ContextValueT {
  handleAuthSession: (values: {
    user: Omit<typeof contextValues, 'isAuth' | 'showAutoLogoutMessage'>
    token?: string
  }) => void
  handleClearSession: (options?: { auto: boolean }) => void
}

const AuthContext = createContext<AuthContextI>({
  ...contextValues,
  handleAuthSession: () => {},
  handleClearSession: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const sessionIsActive = sessionStorage.getItem(SESSION_COUNT_KEY) || false

  const [state, setState] = useState<ContextValueT>({
    isAuth: Boolean(sessionIsActive),
    showAutoLogoutMessage: false,
    firstName: '',
    lastName: '',
    email: '',
    id: '',
  })

  const handleAuthSession = (
    values: Parameters<AuthContextI['handleAuthSession']>[0]
  ) => {
    const s_id = `${String(new Date().getTime())}:${values.user.id}`

    setState((prev) => {
      sessionStorage.setItem(SESSION_COUNT_KEY, values.token as string)
      sessionStorage.setItem('log_time', s_id)

      return {
        ...prev,
        ...values.user,
        isAuth: true,
        showAutoLogoutMessage: false,
      }
    })
  }

  const handleClearSession = (
    options: Parameters<AuthContextI['handleClearSession']>[0]
  ) => {
    // make api call to invalidate token
    // then clear storage
    setState({
      ...state,
      isAuth: false,
      showAutoLogoutMessage: Boolean(options?.auto),
    })
    sessionStorage.clear()
  }

  // automatically append token to session on refresh
  if (sessionIsActive && !request.defaults.headers['Authorization']) {
    request.defaults.headers['Authorization'] = `Bearer ${sessionIsActive}`
  }

  return (
    <AuthContext.Provider
      value={{ ...state, handleAuthSession, handleClearSession }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
