const db = require('../config/db');

class Booking {
    static async create(bookingData) {
        const { user_id, item_id, status, payment_intent_id } = bookingData;
        const [result] = await db.query(
            'INSERT INTO bookings (user_id, item_id, status, payment_intent_id) VALUES (?, ?, ?, ?)',
            [user_id, item_id, status || 'pending', payment_intent_id]
        );
        return result.insertId;
    }
}

module.exports = Booking;
