const express = require("express");
const app = express();
const cors = require("cors"); //thư viện dùng để kết nối với reactjs
app.use(cors());
const PORT = 5000;
const bodyParser = require("body-parser"); //middleware dùng để thực hiện các request với server như POST. PUT
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = [
  { id: 1, name: "Mr.T" },
  { id: 2, name: "Mr.V" },
];
// Định nghĩa các routes và controller
app.get("/", (req, res, next) => {
  res.send(users);
});

app.post("/add-user", (req, res, next) => {
  console.log("connect to reactjs");
  console.log(">>>>>request body", req.body);
  users.push({
    id: users.length + 1,
    name: req.body.name,
  });
  console.log(">> users data", users);
  res.send(users);
});

//Cổng PORT mà server chạy
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
