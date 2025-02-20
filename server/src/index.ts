import { Response, Request, NextFunction } from "express";
import { HttpError } from "http-errors";
import dotenv from "dotenv";
import createError from "http-errors";
import express, { Express } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import usersRouter from "./routes/user";
import authenticationRouter from "./routes/authentication"

const app: Express = express();
const PORT = 3000;
dotenv.config();

mongoose
.connect(process.env.MONGO_URI as string)
.then(() => console.log("Database connected"))
.catch((err:Error) => console.log(err));

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user/', usersRouter);
app.use('/api/auth/', authenticationRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

app.use(function(err:HttpError, req:Request, res:Response, next:NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json(err);
});

app.listen(PORT, () => console.log(`App is running on ${PORT}`));

export default app;