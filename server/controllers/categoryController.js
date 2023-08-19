const Category = require('../model/Categories')
const handleCategory = (req, res) => {
    Category.find({})
    .then(categories => res.json(categories))
    .catch(err => res.status(500).json({ success: false, message: "Couldn't fetch Products" }))
}

module.exports = { handleCategory };