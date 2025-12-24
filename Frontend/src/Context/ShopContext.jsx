import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // 1️⃣ Fetch all products from backend
  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_product(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // 2️⃣ Load user cart from backend (if logged in)
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    fetch("http://localhost:4000/getcart", {
      method: "POST",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCartItems(data.cartData);
        }
      })
      .catch((err) => console.log("Error loading cart:", err));
  }, []);

  // 3️⃣ Add to cart (frontend + MongoDB)
  const addToCart = (itemId) => {
    // update local state
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    // update MongoDB if logged in
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    fetch("http://localhost:4000/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ itemId }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Add to cart:", data))
      .catch((err) => console.log("Error add to cart:", err));
  };

  // 4️⃣ Remove from cart
  const removeFromCart = (itemId) => {
    // update local state
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }));

    const token = localStorage.getItem("auth-token");
    if (!token) return;

    fetch("http://localhost:4000/removefromcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ itemId }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Remove from cart:", data))
      .catch((err) => console.log("Error remove from cart:", err));
  };

  // 5️⃣ Total cart amount
  const getTotalCartAmount = () => {
    let total = 0;
    if (all_product.length === 0) return 0;

    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        let product = all_product.find((p) => p.id === Number(key));
        if (product) {
          total += product.new_price * cartItems[key];
        }
      }
    }
    return total;
  };

  // 6️⃣ Total items in cart
  const getTotalItems = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        total += cartItems[item];
      }
    }
    return total;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalItems,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
