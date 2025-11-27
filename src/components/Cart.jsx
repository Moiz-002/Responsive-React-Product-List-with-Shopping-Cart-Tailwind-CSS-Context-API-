import React, { useContext, useState } from "react";
import EmptyCart from "./EmptyCart";
import CartWithItems from "./CartWithItems";
import { cartContext } from "../cartContext";
import OrderConfirm from "./OrderConfirm";

const Cart = () => {
  const { cart } = useContext(cartContext);
  console.log("Here is my cart:", cart);
  const totalProductsQuantity = (cart && cart.length)
    ? cart.reduce((sum, item) => sum + (item.qty || 0), 0)
    : 0;
  const [confirm, setConfirm] = useState(false);
  function checkOrderConfirmation() {
    
    if (cart && cart.length > 0) {
      setConfirm(true);
      window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    }
  }
  return (
    <div className="bg-white rounded-xl px-5 py-6 flex flex-col gap-4" role="region" aria-labelledby="cart-heading">
      <h2 id="cart-heading" className="text-2xl text-rose-700 font-bold ">Your Cart ({totalProductsQuantity})</h2>
      <div className="flex flex-col gap-3 max-h-56 overflow-scroll">
        {!cart || cart.length === 0 ? (
        <EmptyCart />
      ) : (
        cart.map((item) => (
          <CartWithItems key={item.id || item.category} item={item} />
        ))
      )}
      </div>
      <div className="flex items-center justify-between">
        <p>Order Total</p>
        <h4 className="text-3xl font-bold" aria-live="polite" aria-atomic="true">
          ${cart.reduce((total, item) => total + item.price * item.qty, 0)}
        </h4>
      </div>

      <div className="flex items-center justify-center gap-1.5 bg-rose-50 rounded-lg w-full py-3.5">
        <img src="src/assets/images/icon-carbon-neutral.svg" alt="" aria-hidden="true" />
        <p className="text-sm font-medium">
          This is a <strong>carbon-neutral</strong> delivery
        </p>
      </div>

      <button
        type="button"
        className="w-full text-white bg-red-700 py-4 rounded-full cursor-pointer active:bg-red-900"
        onClick={checkOrderConfirmation}
        disabled={totalProductsQuantity === 0}
        aria-disabled={totalProductsQuantity === 0}
      >
        Confirm Order
      </button>
      {confirm && <OrderConfirm setConfirm={setConfirm}/>}
    </div>
  );
};

export default Cart;
