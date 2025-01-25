import {Request, Response, NextFunction } from "express";
import express from "express"; // maybe doesnt work

const router = express.Router();

router.get('/api/user/:id', function(req:Request, res:Response, next:NextFunction) {
  res.render('index', { title: 'Express' });
});

router.get("/", );
router.get("/:id", );
router.post("/", );

module.exports = router;

