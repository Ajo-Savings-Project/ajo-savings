import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import path from 'path'
import createError, { HttpError } from 'http-errors'
import { dbConfig, ENV } from './config'
import userRoutes from './routes/users'
import groupRoutes from './routes/groups'
import swaggerUi from 'swagger-ui-express'
import specs from './swagger'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

dbConfig
  .sync({})
  .then(() => {
    console.log('Database is connected')
  })
  .catch((err: HttpError) => {
    console.log(err)
  })

app.use('/users', userRoutes)
app.use('/groups', groupRoutes)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404))
})

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

const port = ENV.PORT || 5500

app.listen(port, () => {
  console.log(`server running on ${port}`)
})
