import React, { useContext } from "react";
import { cartContext } from "../cartContext";

const CartWithItems = ({ item }) => {
  const { cart, removeFromCart } = useContext(cartContext);
  const cartItem = cart.find((cartitem) => cartitem.category === item.category);

  return (
    <div
      className="flex flex-col gap-4 max-h-16 w-full sm:w-[350px]"
      role="listitem"
      aria-label={`${item.name} in cart`}
    >
      <div className="flex items-center justify-between">
        {/* Item details */}
        <div>
          <h4 className="text-product font-semibold">{item.name}</h4>

          <div className="flex gap-4" aria-live="polite">
            <span
              className="text-rose-800 font-semibold"
              aria-label={`Quantity: ${cartItem.qty}`}
            >
              {cartItem.qty}x
            </span>

            <span
              className="text-rose-950 font-medium opacity-60"
              aria-label={`Price per item: ${item.price} dollars`}
            >
              @ ${item.price}
            </span>

            <span
              className="text-rose-950 font-semibold opacity-70"
              aria-label={`Subtotal: ${cartItem.qty * cartItem.price} dollars`}
            >
              ${cartItem.qty * cartItem.price}
            </span>
          </div>
        </div>

        {/* Remove button */}
        <div>
          <button
            onClick={() => removeFromCart(item.category)}
            className="group border-amber-900 border active:border-gray-950 p-1 rounded-full cursor-pointer"
            aria-label={`Remove ${item.name} from cart`}
            type="button"
          >
            <span
              className="w-4 h-4 block bg-amber-900 group-active:bg-black mask-[url('/src/assets/images/icon-remove-item.svg')] mask-no-repeat mask-center mask-contain"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-b border-b-amber-950 opacity-10"></div>
    </div>
  );
};

export default CartWithItems;
