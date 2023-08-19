const express = require('express');
const router = express.Router();
const { createStripeSession } = require("../controllers/createStripeSession");
const { verifyJWT } = require('../middleware/verifyJWT');

router.post("/", verifyJWT, createStripeSession);

module.exports = router;