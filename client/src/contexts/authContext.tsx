import { createContext, ReactNode, useState } from 'react'

const contextValues = {
  isAuth: false,
}

type ContextValueT = typeof contextValues

interface AuthContextI extends ContextValueT {
  handleAuthSession: (values: { token: string; refreshToken: string }) => void
  handleClearSession: () => void
}

const AuthContext = createContext<AuthContextI>({
  ...contextValues,
  handleAuthSession: () => {},
  handleClearSession: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  console.log('Context Render', 'Env is DEV: ' + import.meta.env.DEV)
  const [state, setState] = useState<ContextValueT>({
    isAuth: false,
  })

  const handleAuthSession = (
    values: Parameters<AuthContextI['handleAuthSession']>[0]
  ) => {
    console.log(values.token)
    console.log(values.refreshToken)
    setState({ isAuth: true })
  }

  const handleClearSession = () => {
    // make api call to invalidate token
    // then clear storage
    setState({ isAuth: false })
  }

  // get profile here
  // if it returns 401 we attempt to refresh token
  // else log user out

  return (
    <AuthContext.Provider
      value={{ ...state, handleAuthSession, handleClearSession }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
