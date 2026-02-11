const Booking = require('../models/bookingModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createBooking = async (req, res, next) => {
    try {
        const { user_id, item_id } = req.body;

        // TODO: Ideally, fetch item price from DB to avoid client-side manipulation
        const amount = 2000; // Placeholder amount in cents ($20.00)

        // --- STRIPE INTEGRATION PLACEHOLDER ---
        // In a real application, you would create a PaymentIntent here.
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: amount,
        //     currency: 'usd',
        //     metadata: { user_id, item_id }
        // });
        // const payment_intent_id = paymentIntent.id;

        // Mocking a payment intent ID for now
        const payment_intent_id = `pi_mock_${Date.now()}`;
        // --------------------------------------

        const bookingId = await Booking.create({
            user_id,
            item_id,
            status: 'pending', // Initial status
            payment_intent_id
        });

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: {
                booking_id: bookingId,
                client_secret: 'mock_client_secret_for_frontend_completion' // Placeholder
            }
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    createBooking
};
