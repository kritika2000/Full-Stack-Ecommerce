const Product = require("../model/Products");

const handleProduct = (req, res) => {
    Product.find({})
    .then(products => {console.log(products.length); return res.json(products)})
    .catch(err => res.status(500).json({ success: false, message: "Couldn't fetch Products" }))
}

module.exports = { handleProduct };