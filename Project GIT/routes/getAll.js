
import express from 'express';
import Inventory from '../models/Inventory.js';
import Cart from '../models/Cart.js';

const road = express.Router();

road.get('/inventory', async (req, res) => {
    try {
        const inventory = await Inventory.findAll();
        res.status(200).json(inventory);
    } catch (err) {
        console.error("Failed to fetch inventory:", err);
        res.status(500).json({ error: 'Failed to retrieve inventory data' });
    }
});

road.get('/inventory/item/:item', async (req, res) => {
    try {
        const itemName = req.params.item;
        const result = await Inventory.findAll({
            where: { Item: itemName }
        });

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error("Error in /inventory/item/:item:", err.message);
        res.status(500).json({ error: 'Error fetching item' });
    }
});

road.get('/inventory/type/:type', async (req, res) => {
    try {
        const itemType = req.params.type;
        const result = await Inventory.findAll({
            where: { Type: itemType }
        });

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "Item type not found" });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error("Error in /inventory/type/:type:", err.message);
        res.status(500).json({ error: 'Error fetching item type' });
    }
});

road.get('/cart', async (req, res) => {
    try {
        const cart = await Cart.findAll();
        res.status(200).json(cart);
    } catch (err) {
        console.error("Failed to fetch cart:", err);
        res.status(500).json({ error: 'Failed to retrieve cart data' });
    }
});

export default road;
