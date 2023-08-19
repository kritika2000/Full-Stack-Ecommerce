const Order = require("../model/Order");

const getAllOrders = async(req, res) => {
    const username = req.email;
    const currentUserOrders = await Order.findOne({ user: username }).exec();
    res.status(200).json(currentUserOrders); 
}

async function addOrders(order){
    const { user, orders } = order;
    const foundUser = await Order.findOne({ user: user }).exec();
    if(foundUser){
        await Order.updateOne({ user: user }, { $push: {orders: {$each: orders}} })
    }
    else{
        await Order.create(order);
    }
}

module.exports = { getAllOrders, addOrders }