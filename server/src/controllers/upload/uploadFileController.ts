
import path from "path";
import multer from "multer";
import { Request, Response, NextFunction } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, path.join(__dirname, "../../../public/uploads"));
  },
  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const filter = (req: Request, file: Express.Multer.File, cb:any) => {
  file.mimetype === "image/png" ||
  file.mimetype === "image/jpeg" ||
  file.mimetype === "image/webp" ||
  file.mimetype === "video/mp4"
    ? cb(null, true)
    : cb(new Error("Invalid file format. Only JPEG, PNG, WEBP and MP4 are allowed"));
};

export default multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: filter,
});