const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Item = require('../models/itemModel');

const createPaymentIntent = async (req, res, next) => {
    try {
        const { item_id } = req.body;

        if (!item_id) {
            const error = new Error('Item ID is required');
            error.statusCode = 400;
            throw error;
        }

        const item = await Item.getById(item_id);

        if (!item) {
            const error = new Error('Item not found');
            error.statusCode = 404;
            throw error;
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(item.price * 100), // Convert to cents
            currency: 'usd',
            metadata: {
                item_id: item.id,
                item_title: item.title
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    createPaymentIntent
};
