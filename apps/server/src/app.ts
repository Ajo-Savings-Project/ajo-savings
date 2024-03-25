import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import path from 'path'
import createError, { HttpError } from 'http-errors'
import apiV1Routes from './routes/v1'
import swaggerUi from 'swagger-ui-express'
import specs from './swagger'
import { db, ENV } from './config'
import { serverAdapter } from './config/bullBoardConfig'
import cors from 'cors'
import * as Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'
import { HTTP_STATUS_CODE } from './constants'

const app = express()

const port = ENV.PORT || 5500

const allowedOrigins: Array<string> = [
  ENV.FE_BASE_URL as string,
  // CORS allow use of swagger on local environment
  ENV.IS_PROD ? '' : `http://localhost:${port}`,
].filter(Boolean)

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
}

app.use(cors(corsOptions))
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Referrer-Policy', 'no-referrer-when-downgrade') // this header is needed when using http and not https
  next()
})
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

Sentry.init({
  dsn: ENV.DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/admin/queues', serverAdapter.getRouter())

<<<<<<< HEAD
db.sync({})
=======
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

db.sync({
  force: true,
})
>>>>>>> 0073793 (Update database synchronization options)
  .then(() => {
    console.log('Database is connected')
  })
  .catch((err: HttpError) => {
    console.log('DB Error: ', err)
  })

app.use('/api/v1', apiV1Routes)

app.use(Sentry.Handlers.errorHandler())
interface SentryRequestInfo {
  url: string
  method: string
  headers: Record<string, any>
  body: any
}
app.use(function onError(err: HttpError, req: Request, res: Response) {
  const sentryRequest: SentryRequestInfo = {
    url: req.originalUrl,
    method: req.method,
    headers: req.headers,
    body: req.body,
  }

  const sentryContext: Sentry.EventHint = {
    ...{ request: sentryRequest },
    originalException: err,
  }
  Sentry.captureException(err, sentryContext)

  res.statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER
})

// catch 404 and forward to error handler
app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(createError(HTTP_STATUS_CODE.NOT_FOUND))
})

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  Sentry.captureException(err)

  // render the error page
  res.status(err.status || HTTP_STATUS_CODE.INTERNAL_SERVER)
  res.render('error')
})

app.listen(port, () => {
  console.log('\nMake sure Redis is running on port 6379 by default')
  console.log('you can use docker: docker run -d -p 6379:6379 redis\n')
})
