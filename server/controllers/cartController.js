const Cart = require('../model/Cart');

const getAllCartItems = async(req, res) => {
   const username = req.email;
   const currentUserCart = await Cart.findOne({ user: username }).exec();
   res.status(200).json(currentUserCart); 
}
const addCartItem = async(req, res) => {
    const username = req.email;
    const cartItem  = req.body;
    const foundUser = await Cart.findOne({ user: username }).exec();
    console.log(cartItem);
    let newCart = [];
    if(!foundUser){
        newCart = { user: username, cart: [cartItem] };
        await Cart.create(newCart);
    }
    else{
        await Cart.findOneAndUpdate({ user: username }, { $push: {cart: [cartItem]} }).exec();
    }
    return res.status(201).json({success: true, message: "Item added successfully"});
}
const updateCartItem = async(req, res) => {
    const username = req.email;
    const { id }  = req.params;
    const cartItem = req.body;
    await Cart.updateOne({user: username, "cart.id": id}, { "$set": { "cart.$": cartItem }});
    return res.status(201).json({success: true, message: "Item Deleted successfully"});
}

const deleteCartItem = async(req, res) => {
    const username = req.email;
    const { id }  = req.params;
    const foundUser = await Cart.findOne({ user: username }).exec();
    if(foundUser){
        await Cart.findOneAndUpdate({ user: username }, {$pull: {cart: {id: Number(id)}}})
        return res.status(201).json({success: true, message: "Item Deleted successfully"});
    }
    else{
        return res.status(400).json({succss: false, message: "Item doesn't exist"});
    }
}

const deleteAllCartItems = async(req, res) => {
    const username = req.email;
    const foundUser = await Cart.findOne({ user: username }).exec();
    if(foundUser){
        await Cart.deleteMany({ user: username });
        return res.status(201).json({success: true, message: "Item Deleted successfully"});
    }
    else{
        return res.status(400).json({succss: false, message: "No items in cart"});
    }
}

module.exports = { getAllCartItems, addCartItem, updateCartItem, deleteCartItem, deleteAllCartItems };