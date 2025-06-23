import express  from'express';
const router = express.Router();
import Inventory  from'../models/Inventory.js';
import Cart from'../models/Cart.js';
import {handelCart} from '../controllers/processingCartItems.js'


router.post('/add/Inventory', async (req, res) => {
    const { UID, item, cost, type, count} = req.body;

    if (!item || !UID) {
        return res.status(400).send("Can't add item without name or UID!");
    }

    if (!cost || !type) {
        return res.status(402).send("Bad Request");
    }

    try {
        await Inventory.create( {
            UID: UID,
            Item: item,
            Cost: cost,
            Type: type,
            Count: count
        });
        return res.status(200).send("Item added successfully.");
    }
    catch (err) {
        console.error("Error adding item:", err);
        return res.status(400).send("ERROR: " + err);
    }
});


router.put('/update/Invent', async (req, res) => {
    const { UID, item, cost, count} = req.body;

    if (!UID || !item) {
        return res.status(400).send("Can't add item without name or UID!");
    }

    if (!cost || !count) {
        return res.status(402).send("Bad Request");
    }

    try {
        const update = await Inventory.update( {
            Cost: cost,
            Count: count
        },{where: {Item: item, UID: UID}});
        return res.status(200).send("Item added successfully.");
        if (update === 0 ) {
            return res.status(404).send("Item not found or no changes made.");
        }
    }
    catch (err) {
        console.error("Error adding item:", err);
        return res.status(400).send("ERROR: " + err);
    }
});

router.post('/addin/cart', handelCart);

router.delete('/delete/cart', async (req, res) => {
    const { item, UID } = req.body;
    console.log("Deleting item:", item, "for UID:", UID);

    try {
        const deleted = await Cart.destroy( { where:{
            Item: item,
            UID: UID,
        }});
        if(deleted) return res.send("Item Removed");
        else return res.status(404).send("Item not in cart.");
    }
    catch (err) {
        return res.status(500).send("Error removing item: ",err.message);
    }
});

export default router;