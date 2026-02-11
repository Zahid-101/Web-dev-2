const Item = require('../models/itemModel');

const getItems = async (req, res, next) => {
    try {
        const categorySlug = req.query.category;
        const items = await Item.getAll(categorySlug);
        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (err) {
        next(err);
    }
};

const getItemById = async (req, res, next) => {
    try {
        const item = await Item.getById(req.params.id);

        if (!item) {
            const error = new Error('Item not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: item
        });
    } catch (err) {
        next(err);
    }
};

const createItem = async (req, res, next) => {
    try {
        const itemId = await Item.create(req.body);
        const newItem = await Item.getById(itemId);

        res.status(201).json({
            success: true,
            data: newItem
        });
    } catch (err) {
        next(err);
    }
};

const deleteItem = async (req, res, next) => {
    try {
        const affectedRows = await Item.delete(req.params.id);

        if (affectedRows === 0) {
            const error = new Error('Item not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: `Item ${req.params.id} deleted`
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getItems,
    getItemById,
    createItem,
    deleteItem
};
