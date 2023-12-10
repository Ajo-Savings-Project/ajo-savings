type TransformRoute<T> = {
  [K in keyof T]: {
    [P in keyof T[K]]: {
      path: T[K][P] extends string ? T[K][P] : never
      abs_path: T[K][P] extends string ? T[K][P] : never
    }
  }
}

export const createRoutes = <T>(_routes: T): TransformRoute<T> => {
  const str: string[] = []
  const _new_routes = Object.assign({}, _routes)

  const _loop = (r: Record<string, unknown>, p = '') => {
    Object.entries(r).forEach((cur) => {
      const [k, v] = cur
      if (typeof v !== 'string') {
        const _v = v as Record<string, unknown>
        if (p) {
          _loop(_v, `${p}${k}.`)
        } else {
          _loop(_v, `${k}.`)
        }
      } else {
        str.push(`${p}${k}`)
      }
    })
  }
  _loop(_routes as Record<string, never>)

  str.forEach((key) => {
    const keys = key.split('.')

    if (keys.length > 1) {
      // @ts-ignore
      keys.reduce((acc: Record<string, unknown>, key: string) => {
        if (acc && acc[key] !== undefined) {
          if (typeof acc[key] === 'string') {
            acc[key] = {
              path: acc[key],
              abs_path: `/${keys.join('/')}`.replace('/root', ''),
            }
          } else {
            return acc[key]
          }
        }
        return acc
      }, _new_routes)
    }
  })

  return _new_routes as TransformRoute<T>
}
