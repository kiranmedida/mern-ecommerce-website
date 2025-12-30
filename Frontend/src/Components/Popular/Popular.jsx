import React, { useState, useEffect } from "react";
import "./Popular.css";
import Item from "../Item/Item";

const BACKEND_URL = "https://mern-ecommerce-website-v9ns.onrender.com";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/popularinwomen`)
      .then((response) => response.json())
      .then((data) => setPopularProducts(data))
      .catch((err) =>
        console.error("Error fetching popular products:", err)
      );
  }, []);

  return (
    <div>
      <hr />

      <div className="popular-item">
        {popularProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
