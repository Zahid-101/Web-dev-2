const db = require('../config/db');

class Item {
    static async getAll(categorySlug) {
        let query = 'SELECT * FROM items';
        let params = [];

        if (categorySlug) {
            query += ' WHERE category_slug = ?';
            params.push(categorySlug);
        }

        const [rows] = await db.query(query, params);
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(itemData) {
        const { title, description, category_slug, date, location, price, is_holiday, holiday_name } = itemData;
        const [result] = await db.query(
            'INSERT INTO items (title, description, category_slug, date, location, price, is_holiday, holiday_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, description, category_slug, date, location, price, is_holiday || false, holiday_name]
        );
        return result.insertId;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM items WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Item;
