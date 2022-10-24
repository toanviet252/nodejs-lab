const Products = require("../models/products");

exports.postaddProduct = (req, res, next) => {
  console.log("add products");
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Products(title, imageUrl, description, price);
  product.save();
  res.sendStatus(201); //bắt buộc phải trả về một status để trình duyệt lấy được data
};

exports.getAllProducts = (req, res, next) => {
  Products.fetchAll((products) => {
    res.send(products);
  });
};
