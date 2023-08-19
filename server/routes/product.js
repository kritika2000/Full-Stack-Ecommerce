const express = require('express');
const router = express.Router();
const { handleProduct } = require("../controllers/productController");

router.get("/", handleProduct);

module.exports = router;