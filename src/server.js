import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import homeRouter from "./routes/home";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

const MONGODB_URI = `mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_DB_KEY}@cluster0.aykpcwd.mongodb.net/${process.env.MONGOOSE_COLLECTION}?retryWrites=true&w=majority`;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all website to send request
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(authRouter);

app.use(homeRouter);

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode;
  const message = err.message;
  res.status(status).json({
    message,
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT);
    console.log("Mongoose connected", `Server is running on PORT: ${PORT}`);
  })
  .catch((err) => console.log(err));
