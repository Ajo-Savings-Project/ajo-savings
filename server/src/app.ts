import express, { Request, Response, NextFunction }  from 'express'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import logger from "morgan";
import path from "path";
import createError, { HttpError } from "http-errors";
import userRoutes from './routes/users'
import groupRoutes from './routes/groups'


dotenv.config();
const app = express();



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use('/users', userRoutes);
app.use('/groups', groupRoutes)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });


const port = process.env.DEV_PORT

app.listen(port, ()=>{
    console.log(`server running on ${port}`)
})