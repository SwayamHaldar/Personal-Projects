import { processCartItems } from '../services/cartServices.js';

export async function handelCart(req, res) {
    const cartItems = req.body.cartItems;

    if (!Array.isArray(cartItems)) {
        return res.status(402).send("Bad Request: Expected an array");
    }

    try {
        await processCartItems(cartItems)
        res.status(200).json({ message: 'Cart Updated Successfully.' });

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}