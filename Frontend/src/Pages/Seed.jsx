import React, { useState } from "react";
// 🔹 adjust path if needed
import all_product from "../Components/Assets/all_product";

// ✅ Render backend URL
const BACKEND_URL = "https://mern-ecommerce-website-v9ns.onrender.com";

const Seed = () => {
  const [status, setStatus] = useState("");
  const [doneCount, setDoneCount] = useState(0);

  const seedProducts = async () => {
    try {
      setStatus("Seeding products...");
      setDoneCount(0);

      for (const p of all_product) {
        const product = {
          name: p.name,
          image: p.image,
          category: p.category,
          new_price: p.new_price,
          old_price: p.old_price,
        };

        const resp = await fetch(`${BACKEND_URL}/addproduct`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        const data = await resp.json();

        if (data.success) {
          setDoneCount((prev) => prev + 1);
          console.log("✅ Seeded:", product.name);
        } else {
          console.log("❌ Failed:", product.name);
        }
      }

      setStatus("✅ All products seeded successfully!");
    } catch (err) {
      console.error("Seed error:", err);
      setStatus("❌ Error while seeding products");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Seed Products</h2>
      <p>
        This will insert all products from <code>all_product</code> into MongoDB.
      </p>

      <button
        onClick={seedProducts}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        Seed Products
      </button>

      <div>
        <p>{status}</p>
        {doneCount > 0 && <p>Inserted: {doneCount} products</p>}
      </div>

      <hr />

      <h3>Preview (local data):</h3>
      <ul>
        {all_product.map((item) => (
          <li key={item.id}>
            {item.id}. {item.name} ({item.category}) – ₹{item.new_price} / ₹
            {item.old_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Seed;
