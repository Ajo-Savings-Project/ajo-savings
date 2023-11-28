import { createRoutes } from './createRoutes.ts'

const routes = createRoutes({
  landing: { root: '/' },
  playground: { root: '/playground' },
  auth: {
    root: '/auth',
    login: 'login',
    signup: 'signup',
    resetPassword: 'reset-password',
  },
  dashboard: {
    root: '/dashboard',
    groups: 'groups',
    transactions: 'transactions',
    settings: 'settings',
    savings: 'savings',
  },
  about: {
    root: '/about',
    history: 'history',
    anotherNesting: {
      root: '/anotherNesting',
      page2: 'page2',
    },
  },
})
export default routes
