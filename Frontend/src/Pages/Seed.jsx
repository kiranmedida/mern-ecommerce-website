import React, { useState } from "react";
// 🔹 adjust the path below if needed
import all_product from "../Components/Assets/all_product";

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

        // call your existing /addproduct route
        const resp = await fetch("http://localhost:4000/addproduct", {
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
          console.log("Seeded:", product);
        } else {
          console.log("Failed to add:", product.name);
        }
      }

      setStatus("✅ All products seeded!");
    } catch (err) {
      console.error("Seed error:", err);
      setStatus("❌ Error while seeding");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Seed Products</h2>
      <p>This will send all products from all_product to the backend.</p>

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

      <h3>Preview from all_product:</h3>
      <ul>
        {all_product.map((item) => (
          <li key={item.id}>
            {item.id}. {item.name} ({item.category}) – {item.new_price} /{" "}
            {item.old_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Seed;
