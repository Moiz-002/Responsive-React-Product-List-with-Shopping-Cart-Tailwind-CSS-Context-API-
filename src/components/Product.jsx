{
  cartItem && cartItem.qty > 0 ? (
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
          className="w-4 h-4 block bg-white group-active:bg-red-500 mask-[url('/src/assets/images/icon-increment-quantity.svg')] mask-no-repeat mask-center mask-contain"
          role="img"
          aria-hidden="true"
        ></span>
      </button>

      <p className="font-semibold text-white" aria-live="polite">
        {cartItem.qty}
      </p>

      <button
        type="button"
        className="group border border-white p-1.5 rounded-full active:bg-white"
        onClick={() => decreaseQuantity(category)}
        aria-label={`Decrease quantity of ${name}`}
      >
        <span
          className="w-4 h-4 block bg-white group-active:bg-red-500 mask-[url('/src/assets/images/icon-decrement-quantity.svg')] mask-no-repeat mask-center mask-contain"
          role="img"
          aria-hidden="true"
        ></span>
      </button>
    </span>
  ) : (
    <button
      type="button"
      className="flex items-center justify-center gap-1.5 cursor-pointer border-rose-950 border-2 w-full max-w-fit -translate-y-1/2 px-6 py-3 bg-white rounded-full active:border-red-600 active:text-red-600"
      onClick={() => addToCart(category)}
      aria-label={`Add ${name} to cart`}
    >
      <img
        src="src/assets/images/icon-add-to-cart.svg"
        alt=""
        aria-hidden="true"
      />
      <p className="font-semibold">Add to Cart</p>
    </button>
  );
}
