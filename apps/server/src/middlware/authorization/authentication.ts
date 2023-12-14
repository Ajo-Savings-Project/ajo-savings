import { Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ENV } from '../../config/index'

export const auth = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization
    if (authorization === undefined) {
      return res.status(401).send({
        status: 'There is an Error',
        message: 'Ensure that you are logged in',
      })
    }
    const pin = authorization.split(' ')[1]
    if (!pin || pin === '') {
      return res.status(401).send({
        status: 'Error',
        message: "The pin can't be used",
      })
    }
    const decoded = jwt.verify(pin, `${ENV.APP_SECRET}`)
    req.user = decoded

    return next()
  } catch (err) {
    console.log('ERROR:', err)
    return res.status(401).send({
      status: 'Error',
      message: err,
    })
  }
}
