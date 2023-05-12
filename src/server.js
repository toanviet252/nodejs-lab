import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import session from "express-session";
import MongoDBStoreFactory from "connect-mongodb-session";
import authRouter from "./routes/auth";
import adminRouter from "./routes/admin";
import userRouter from "./routes/user";
import shopRouter from "./routes/shop";
import multer from "multer";
import http from "http";

import { ioInit } from "./utils/socket";

const MongoDBStore = MongoDBStoreFactory(session);

dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_DB_KEY}@cluster0.aykpcwd.mongodb.net/${process.env.MONGOOSE_COLLECTION}?retryWrites=true&w=majority`;

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "session",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5000;

// socket
const server = http.createServer(app);
ioInit(server).on("connection", (socket) => {
  console.log("Client connected");
  socket.on("send_message", (data) => {
    console.log("emit socket data", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replaceAll(" ", ""));
  },
});
const fileFilter = (req, file, cb) => {
  // console.log("file", file);
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    const error = new Error("Only accept image file");
    error.statusCode = 400;
    return cb(error, false);
  }
  cb(null, true);
};

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "*"],
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
// serve static image file
app.use("/images", express.static(path.join(__dirname, "../images")));

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3, //3days
      httpOnly: true,
    },
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(multer({ storage, fileFilter }).array("photos", 20)); //max photos is 20

app.use(authRouter);

app.use(shopRouter);

app.use("/admin", adminRouter);

app.use(userRouter);

// error handler
// eslint-disable-next-line
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
    server.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}, Database connected`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
