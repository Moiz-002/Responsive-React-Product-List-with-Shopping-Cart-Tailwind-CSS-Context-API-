import React, { useContext } from "react";
import { cartContext } from "../cartContext.jsx";

const Product = ({ image, name, category, price }) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(cartContext);
  const cartItem = cart.find((item) => item.category === category);
  console.log("Cart Item", cartItem);

  return (
    <div
      className={
        "max-w-full overflow-hidden flex flex-col items-center justify-center py-2 gap-2"
      }
    >
      <div className="flex flex-col items-center justify-center">
        <picture
          className={`rounded-2xl ${
            cartItem && cartItem.qty > 0 ? "border-3 border-red-600" : ""
          }`}
        >
          <source
            media="(min-width:1024px)"
            srcSet={`/images/${image.desktop}`}
          />
          <source
            media="(min-width:768px)"
            srcSet={`/images/${image.tablet}`}
          />
          <img
            className="rounded-xl"
            src={`/images/${image.mobile}`}
            alt={name}
            loading="lazy"
          />
        </picture>
        {cartItem && cartItem.qty > 0 ? (
          <span
            className="flex items-center justify-between gap-1.5 cursor-pointer w-full max-w-40 -translate-y-1/2 px-3 py-3 bg-red-600 rounded-full"
            role="group"
            aria-label={`Quantity controls for ${name}`}
          >
            <button
              type="button"
              className="group border border-white p-1.5 rounded-full active:bg-white"
              onClick={() => increaseQuantity(category)}
              aria-label={`Increase quantity of ${name}`}
            >
              <span
                aria-hidden="true"
                className="w-4 h-4 block bg-white group-active:bg-red-500 mask-[url('/images/icon-increment-quantity.svg')] mask-no-repeat mask-center mask-contain"
              ></span>
            </button>

            <p className="font-semibold text-white" aria-live="polite" aria-atomic="true">{cartItem.qty}</p>

            <button
              type="button"
              className="group border border-white p-1.5 rounded-full active:bg-white"
              onClick={() => decreaseQuantity(category)}
              aria-label={`Decrease quantity of ${name}`}
            >
              <span
                aria-hidden="true"
                className="w-4 h-4 block bg-white group-active:bg-red-500 mask-[url('/images/icon-decrement-quantity.svg')] mask-no-repeat mask-center mask-contain"
              ></span>
            </button>
          </span>
        ) : (
          <button
            className="flex items-center justify-center gap-1.5 cursor-pointer border-rose-950 border-2 w-full max-w-fit -translate-y-1/2 px-6 py-3 bg-white rounded-full active:border-red-600 active:text-red-600"
            type="button"
            onClick={() => addToCart(category)}
          >
            <img src="/images/icon-add-to-cart.svg" alt="" aria-hidden="true" />
            <p className="font-semibold">Add to Cart</p>
          </button>
        )}
      </div>
      <div className="flex justify-start flex-col items-start w-full">
        <p className="text-neutral-600 font-medium">{category}</p>
        <h2 className="text-black font-bold">{name}</h2>
        <h4 className="text-rose-700 font-semibold">
          ${parseFloat(price).toFixed(2)}
        </h4>
      </div>
    </div>
  );
};

export default Product;
