import React, { createContext, useState } from "react";
import data from "../data.json";

// Making the context
export const cartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(category) {
    const product = data.find((item) => item.category === category);
    const newProduct = { ...product, qty: 1 };
    setCart((prev) => [...prev, newProduct]);
  }

  function removeFromCart(category) {
    setCart((prev) => prev.filter((item) => item.category !== category));
  }

  function increaseQuantity(category) {
    setCart((prev) =>
      prev.map((item) =>
        item.category === category ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }

  function decreaseQuantity(category) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.category === category ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function emptyCart(){
    setCart([]);
  }

  console.log(cart);

  return (
    <cartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        emptyCart
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
