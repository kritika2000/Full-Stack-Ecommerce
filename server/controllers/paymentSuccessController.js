const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { addOrders } = require("./orderController");

function getTodaysDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return today = dd + '/' + mm + '/' + yyyy;
}

const fulfillOrder = (lineItems, event) => {
    const date = getTodaysDate();
    console.log(lineItems);
    const orders = lineItems.map(item => ({
        id: item.description,
        price: item.amount_total / 100,
        quantity: item.quantity,
        payment_status: event.data.object.payment_status,
        order_date: date
    }))
    addOrders({ user: event.data.object.customer_email, orders });
}

const handlePayment = async(req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    const endpointSecret = "whsec_46c09e4300641cd54d56c8539ac5da05a58b8aa47430fde775e497f6858637c1";
    let event;

    try {
        event = Stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

     // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        const sessionWithLineItems = await Stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
            expand: ['line_items'],
        }
    );
    const lineItems = sessionWithLineItems.line_items;
    fulfillOrder(lineItems.data, event);
    
}
    res.status(200).end();
}

module.exports = { handlePayment };