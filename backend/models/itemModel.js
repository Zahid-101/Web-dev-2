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
}

module.exports = Item;
