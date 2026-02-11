const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async create(userData) {
        const { name, email, password, role } = userData;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role || 'user']
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async matchPassword(enteredPassword, storedPassword) {
        return await bcrypt.compare(enteredPassword, storedPassword);
    }
}

module.exports = User;
