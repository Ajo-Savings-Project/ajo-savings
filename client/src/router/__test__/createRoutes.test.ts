import { createRoutes } from '../createRoutes.ts'

describe('createRoutes', () => {
  const sampleRoutes = {
    auth: {
      root: '/auth',
      login: 'login',
      logout: 'logout',
    },
  }

  const expectedResult = {
    auth: {
      root: {
        path: '/auth',
        abs_path: '/auth',
      },
      login: {
        path: 'login',
        abs_path: '/auth/login',
      },
      logout: {
        path: 'logout',
        abs_path: '/auth/logout',
      },
    },
  }

  it('should transform routes and should contain path and abs_path', function () {
    const result = createRoutes(sampleRoutes)
    expect(result).toStrictEqual(expectedResult)
  })
})
