const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { handlePayment } = require("../controllers/paymentSuccessController");

router.post("/", bodyParser.raw({type: 'application/json'}), handlePayment);

module.exports = router;