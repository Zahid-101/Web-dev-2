const Joi = require('joi');

const validateBooking = (req, res, next) => {
    const schema = Joi.object({
        user_id: Joi.number().integer().required(),
        item_id: Joi.number().integer().required(),
        status: Joi.string().valid('pending', 'confirmed', 'cancelled').default('pending'),
        payment_intent_id: Joi.string().optional()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message
        });
    }

    next();
};

module.exports = {
    validateBooking
};
