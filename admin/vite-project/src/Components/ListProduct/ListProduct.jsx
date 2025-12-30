import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

// 🔗 Render backend URL
const BACKEND_URL = "https://mern-ecommerce-website-v9ns.onrender.com";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  // Fetch all products
  const fetchInfo = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/allproducts`);
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Load products on page load
  useEffect(() => {
    fetchInfo();
  }, []);

  // Remove product
  const remove_product = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/removeproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      // Refresh list after delete
      fetchInfo();
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>

      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <hr />

      {allproducts.map((product) => (
        <div key={product.id}>
          <div className="listproduct-format-main listproduct-format">
            <img
              src={product.image}
              alt={product.name}
              className="listproduct-product-icon"
            />

            <p>{product.name}</p>
            <p>₹{product.old_price}</p>
            <p>₹{product.new_price}</p>
            <p>{product.category}</p>

            <img
              src={cross_icon}
              alt="Remove"
              className="listproduct-remove-icon"
              onClick={() => remove_product(product.id)}
            />
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
