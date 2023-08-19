const express = require('express');
const router = express.Router();
const { handleCategory } = require("../controllers/categoryController");

router.get("/", handleCategory);

module.exports = router;