const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("Category", CategorySchema);