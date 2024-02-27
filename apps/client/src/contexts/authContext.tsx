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
  kycComplete: false,
  profilePic: '',
}

type ContextValueT = Partial<typeof contextValues>

interface AuthContextI extends ContextValueT {
  handleAuthSession: (values: {
    data: Omit<
      typeof contextValues,
      'isAuth' | 'showAutoLogoutMessage' | 'profilePic'
    >
    token?: string
  }) => void
  handleClearSession: (options?: { auto: boolean }) => void
  handleStateUpdate: (updateState: Partial<ContextValueT>) => void
}

const AuthContext = createContext<AuthContextI>({
  ...contextValues,
  handleAuthSession: () => {},
  handleClearSession: () => {},
  handleStateUpdate: () => {},
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
    kycComplete: false,
  })
  const handleAuthSession = (
    values: Parameters<AuthContextI['handleAuthSession']>[0]
  ) => {
    const s_id = `${String(new Date().getTime())}:${values.data.id}`

    setState((prev) => {
      sessionStorage.setItem(SESSION_COUNT_KEY, values.token as string)
      sessionStorage.setItem('log_time', s_id)

      return {
        ...prev,
        ...values.data,
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

  const handleStateUpdate = (newState: Partial<ContextValueT>) => {
    setState((prev) => {
      return { ...prev, ...newState }
    })
  }
  // automatically append token to session on refresh
  if (sessionIsActive && !request.defaults.headers['Authorization']) {
    request.defaults.headers['Authorization'] = `Bearer ${sessionIsActive}`
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        handleAuthSession,
        handleClearSession,
        handleStateUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
