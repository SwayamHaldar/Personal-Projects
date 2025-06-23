// services/cartService.js
import Inventory from '../models/Inventory.js';
import Cart from '../models/Cart.js';
import sequel from '../config.js';

export async function processCartItems(cartItemList) {
const t = await sequel.transaction();

try {
let totalCost = 0;
let totalItemCount = 0;
let successfulItems = [];


for (const cartItem of cartItemList) {
  try {
    const available = await Inventory.findOne({
      where: {
        Item: cartItem.Item,
        UID: cartItem.UID
      },
      transaction: t
    });

    if (!available || available.Count < cartItem.Quantity) {
      console.log(`Not enough or invalid match for ${cartItem.Item} with UID ${cartItem.UID}`);
      continue;
    }

    const Buying = await Cart.findOne({
      where: {
        Item: cartItem.Item,
        UID: cartItem.UID
      },
      transaction: t
    });

    if (Buying) {
      await Buying.increment('Quantity', {
        by: cartItem.Quantity,
        transaction: t
      });
    } else {
      await Cart.create({
        Item: cartItem.Item,
        Quantity: cartItem.Quantity,
        UID: cartItem.UID,
        TotalCount: 0,
        TotalCost: 0
      }, { transaction: t });
    }

    await available.decrement('Count', {
      by: cartItem.Quantity,
      transaction: t
    });

    totalItemCount += cartItem.Quantity;
    totalCost += cartItem.Quantity * available.Cost;
    successfulItems.push(cartItem);

  } catch (innerErr) {
    console.error(`Error processing item ${cartItem.Item} (${cartItem.UID}):`, innerErr.message);
    continue;
  }
}

if (successfulItems.length === 0) {
  await t.rollback();
  console.error("🚫 Transaction failed: No valid items processed.");
  return;
}

const userCartItems = await Cart.findAll({ transaction: t });

for (const item of userCartItems) {
  await item.update({
    TotalCount: totalItemCount,
    TotalCost: totalCost
  }, { transaction: t });
}

await t.commit();
console.log(`✅ Transaction complete: ${totalItemCount} items, ₹${totalCost}`);


} catch (err) {
await t.rollback();
console.error("🔥 Critical failure in processing cart:", err.message);
}
}

export async function clearCart() {
const t = await sequel.transaction();

try {
const userCartItems = await Cart.findAll({ transaction: t });


if (userCartItems.length === 0) {
  console.log("🛒 No items in cart to clear.");
  return;
}

for (const item of userCartItems) {
  await item.destroy({ transaction: t });
}

await t.commit();
console.log("🗑️ Cart cleared successfully.");


} catch (err) {
await t.rollback();
console.error("🔥 Error clearing cart:", err.message);
}
}
