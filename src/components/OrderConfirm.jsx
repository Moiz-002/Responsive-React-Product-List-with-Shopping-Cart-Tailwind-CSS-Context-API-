import React, { useContext, useEffect, useRef } from "react";
import { cartContext } from "../cartContext";

const OrderConfirm = ({ setConfirm }) => {
  const { cart, emptyCart } = useContext(cartContext);

  // clear cart and close modal
  function handleStartNewOrder() {
    emptyCart();
    setConfirm(false);
  }

  // Accessibility: trap focus inside the modal while open and close on Escape/backdrop click
  const modalRef = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;

    // focus the modal container
    const node = modalRef.current;
    if (node) {
      node.focus();
    }

    function onKeyDown(e) {
      // close on Escape
      if (e.key === "Escape") {
        setConfirm(false);
      }

      // trap focus
      const focusable = node.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (e.key === "Tab" && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // restore previous focus
      if (previous && previous.focus) previous.focus();
    };
  }, [setConfirm]);

  return (
    <div
      className="fixed inset-0 w-full bg-opacity-40 flex items-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-confirm-title"
      onClick={(e) => {
        // close when clicking backdrop (but not when clicking inside the modal)
        if (e.target === e.currentTarget) {
          setConfirm(false);
        }
      }}
    >
      {/* Background overlay */}
      <div
        className="bg-black opacity-20 absolute inset-0 z-10"
        aria-hidden="true"
      ></div>

      {/* Modal box */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full bg-white rounded-t-2xl p-6 sm:absolute sm:left-1/2 sm:top-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[560px] shadow-xl z-20 flex flex-col gap-6"
      >

        {/* Modal Header */}
        <div className="flex items-start flex-col gap-6">
          <img
            src="/images/icon-order-confirmed.svg"
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
                <div className="flex items-center justify-between" role="listitem">
                  <div className="flex items-center gap-5">
                      <img
                      className="w-15 h-15 rounded-lg"
                      src={`/images/${item.image.thumbnail}`}
                      alt={item.name}
                    />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-product font-semibold">{item.name}</h3>

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
                {cart.reduce(
                  (total, item) => total + item.price * item.qty,
                  0
                )}
              </h4>
            </div>
          </div>
        </div>

        {/* Start New Order Button */}
        <button
          type="button"
          className="w-full text-white bg-red-700 active:bg-red-900 py-4 rounded-full cursor-pointer"
          onClick={handleStartNewOrder}
          aria-label="Start a new order"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirm;
