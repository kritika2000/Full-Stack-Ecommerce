const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const { getAllCartItems, addCartItem, deleteCartItem, updateCartItem, deleteAllCartItems } = require("../controllers/cartController");
const { verifyJWT } = require('../middleware/verifyJWT');

app.use(cors());
router.route("/")
.get(verifyJWT, getAllCartItems)
.post(verifyJWT, addCartItem)
.delete(verifyJWT, deleteAllCartItems)

router.route("/:id")
.put(verifyJWT, updateCartItem)
.delete(verifyJWT, deleteCartItem)

module.exports = router;