import { Response, Request, NextFunction } from "express";
import { HttpError } from "http-errors";
import dotenv from "dotenv";
dotenv.config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

//udelej dotenv soubor pls pls
//udelej dotenv soubor pls pls
//udelej dotenv soubor pls pls
//udelej dotenv soubor pls pls
//udelej dotenv soubor pls pls

mongoose
.connect(process.env.MONGO_URI as string)
.then(() => console.log("Database connected"))
.catch((err:Error) => console.log(err));

const usersRouter = require('./routes/user');

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);

app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err:HttpError, req:Request, res:Response, next:NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;