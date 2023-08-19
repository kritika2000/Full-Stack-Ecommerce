const app = require('express')();
const cors = require("cors");
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(cors());
const createStripeSession = async (req, res) => {
    try{
    const { email } = req.body.currentLoggedInUserDetails;
    const { cartItems } = req.body;
    const lineItemsList = cartItems.map(item => ({
        price_data: { 
        currency: 'inr', 
        product_data:{ 
            name: item.id,
            description: item.title,
            images: [item.image]
        }, 
         unit_amount: item.price * 100
        },
        quantity: item.quantity
    }))
    const session = await Stripe.checkout.sessions.create({
        customer_email: email,
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
            shipping_address_collection: {
            allowed_countries: ['IN'],
        },
        line_items: lineItemsList,
        mode: 'payment',
        success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/cart`
    })
        console.log(session.id);
        res.json({  sessionId: session.id })
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

module.exports = { createStripeSession };
