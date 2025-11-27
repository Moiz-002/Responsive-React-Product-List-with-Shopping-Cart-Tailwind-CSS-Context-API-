import React from "react";
import { cartContext } from "../cartContext";
import { useContext } from "react";

const OrderConfirm = ({ setConfirm }) => {
  const { cart, emptyCart } = useContext(cartContext);

  function EmptyCart() {
    emptyCart();
    setConfirm(false);
  }

  return (
    <div
      className="fixed inset-0 w-full bg-opacity-40 flex items-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-confirm-title"
    >
      {/* Background overlay */}
      <div
        className="bg-black opacity-20 absolute inset-0 z-10"
        aria-hidden="true"
      ></div>

      {/* Modal box */}
      <div className="w-full bg-white rounded-t-2xl p-6 sm:absolute sm:left-1/2 sm:top-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[560px] shadow-xl z-20 flex flex-col gap-6">
        {/* Modal Header */}
        <div className="flex items-start flex-col gap-6">
          <img
            src="src/assets/images/icon-order-confirmed.svg"
            alt="Order confirmed icon"
          />

          <h2 id="order-confirm-title" className="text-5xl font-bold">
            Order Confirmed
          </h2>

          <p className="text-neutral-600 font-medium">
            We hope you enjoy your food!
          </p>
        </div>

        {/* Order Items */}
        <div className="bg-neutral-50 rounded-xl">
          <div className="p-6 max-h-50 overflow-scroll" role="list">
            {cart.map((item) => (
              <React.Fragment key={item.category}>
                <div
                  className="flex items-center justify-between"
                  role="listitem"
                >
                  <div className="flex items-center gap-5">
                    <img
                      className="w-15 h-15 rounded-lg"
                      src={`src/assets/images/${item.image.thumbnail}`}
                      alt={item.name}
                    />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-product font-semibold">
                        {item.name}
                      </h3>

                      <div className="flex gap-4">
                        <span className="text-rose-800 font-semibold">
                          {item.qty}x
                        </span>

                        <span className="text-rose-950 font-medium opacity-60">
                          @ ${item.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-black font-semibold opacity-70 text-lg">
                    ${item.qty * item.price}
                  </p>
                </div>

                <div className="w-full border-b border-b-amber-950 opacity-10 pt-3"></div>
              </React.Fragment>
            ))}
          </div>

          {/* Total */}
          <div className="p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p>Order Total</p>
              <h4
                className="text-3xl font-bold"
                aria-live="polite"
                aria-atomic="true"
              >
                $
                {cart.reduce((total, item) => total + item.price * item.qty, 0)}
              </h4>
            </div>
          </div>
        </div>

        {/* Start New Order Button */}
        <button
          type="button"
          className="w-full text-white bg-red-700 active:bg-red-900 py-4 rounded-full cursor-pointer"
          onClick={EmptyCart}
          aria-label="Start a new order"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirm;
