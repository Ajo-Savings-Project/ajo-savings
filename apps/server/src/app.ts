import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import logger from 'morgan'
import path from 'path'
import createError, { HttpError } from 'http-errors'
import apiV1Routes from './routes/v1'
import swaggerUi from 'swagger-ui-express'
import specs from './swagger'
import { db, ENV } from './config'
import { serverAdapter } from './config/bullBoardConfig'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/admin/queues', serverAdapter.getRouter())

db.sync({
  // force:true
})
  .then(() => {
    console.log('Database is connected')
  })
  .catch((err: HttpError) => {
    console.log('DB Error: ', err)
  })

app.use('/api/v1', apiV1Routes)

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
  console.log(
    `\n\nAjo Server:\n\nApi docs, open @  http://localhost:${port}/api-docs`
  )
  console.log(`\nLocal baseUrl, use @ http://localhost:${port}/api/`)
  console.log(`\nBull UI, open @ http://localhost:${port}/admin/queues`)
  //you can use docker: docker run -d -p 6379:6379 redis
  console.log('\nMake sure Redis is running on port 6379 by default\n')
})
