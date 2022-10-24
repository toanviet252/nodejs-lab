const express = require("express");
const app = express();
const cors = require("cors"); //thư viện dùng để kết nối với reactjs
app.use(cors());
const PORT = 5000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const adminRouter = require("./routes/admin");
const homeRouter = require("./routes/home");

// Định nghĩa các routes và controller
app.use(homeRouter);
app.use("/admin", adminRouter);

//Cổng PORT mà server chạy
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
