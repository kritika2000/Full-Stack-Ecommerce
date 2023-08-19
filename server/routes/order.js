const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const { getAllOrders } = require("../controllers/orderController");
const { verifyJWT } = require('../middleware/verifyJWT');

app.use(cors());
router.route("/")
.get(verifyJWT, getAllOrders)

module.exports = router;