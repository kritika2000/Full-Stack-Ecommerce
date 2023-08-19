const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
   user: {
    type: String,
    required: true
   },
   cart: [{
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        rate: {
            type: Number,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    },
    quantity: {
        type: Number,
        required: true
    }
   }]
})

module.exports = mongoose.model("Cart", CartSchema);