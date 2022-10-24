const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/add-product", adminController.getAllProducts);
router.post("/add-product", adminController.postaddProduct);

module.exports = router;
