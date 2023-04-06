import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "*"], //load ảnh từ nguồn khác
      },
    },
  })
);
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream })); //lưu thành 1 file log trên local

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MONGODB_URI = `mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_DB_KEY}@cluster0.aykpcwd.mongodb.net/${process.env.MONGOOSE_COLLECTION}?retryWrites=true&w=majority`;

app.use((req, res, next) => {
  res.setHeader("Access-Allow-Control-Origin", "*");
  res.setHeader(
    "Access-Allow-Control-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Allow-Control-Headers", "Content-Type, Authorization");
  next();
});

app.use((err, req, res, next) => {
  console.log(err);
  const message = err.message;
  const status = err.statusCode;
  res.status(status).json({
    message,
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(5000);
    console.log(`Server is running on PORT ${PORT}, Database connected`);
  })
  .catch((err) => {
    console.log(err);
  });
