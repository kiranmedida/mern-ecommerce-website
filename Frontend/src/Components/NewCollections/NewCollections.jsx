import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";

// ✅ Render backend URL
const BACKEND_URL = "https://mern-ecommerce-website-v9ns.onrender.com";

const NewCollections = () => {
  const [new_collections, setNew_collections] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/newcollections`)
      .then((res) => res.json())
      .then((data) => {
        console.log("NEW COLLECTION DATA:", data);
        setNew_collections(data);
      })
      .catch((err) => {
        console.error("Error fetching new collections:", err);
      });
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />

      <div className="collections">
        {new_collections.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}     // ✅ handled centrally in Item.jsx
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
