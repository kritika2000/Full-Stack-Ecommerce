require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require("./db/dbConnection")
const PORT = process.env.PORT || 5000;

// Connect to DB 

connectDB();

app.use(cors());

app.use("/webhook", require("./routes/webhook"));

app.use(express.json());

app.use("/authorize", require('./routes/authorize'));

app.use("/login", require('./routes/login'));

app.use("/register", require("./routes/register"));

app.use("/api/products", require("./routes/product"));

app.use("/api/categories", require("./routes/category"));

app.use("/api/cart", require("./routes/cart"));

app.use("/api/create-stripe-session", require("./routes/stripe"));

app.use("/api/orders", require("./routes/order"));

// If connection to DB fails, we don't want to start the server.
mongoose.connection.once('open', () => {
    console.log('Connected To MongoDB');
    app.listen(PORT, () => {
        console.log(`Server started listening at PORT ${PORT}`);
    })
})
     
