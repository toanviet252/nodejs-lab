const Products = require("../models/products");

exports.getProducts = (req, res, next) => {
  Products.fetchAll((products) => {
    res.send(products);
  });
};
