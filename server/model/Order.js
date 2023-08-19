const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
   user: {
    type: String,
    required: true
   },
   orders: [{
    id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    order_date: {
        type: String,
        required: true
    }
   }]
})

module.exports = mongoose.model("Order", OrderSchema);