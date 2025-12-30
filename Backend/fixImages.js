const mongoose = require("mongoose");

const user = "kiranmedida";
const pass = "virat9009";
const host = "cluster0.7egsdiz.mongodb.net";
const db = "e-commerce";

const uri = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    image: String,
  }),
  "products"
);

async function fixImages() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");

    const products = await Product.find({
      image: { $regex: "localhost:4000" },
    });

    let count = 0;

    for (let p of products) {
      p.image = p.image.replace(
        "http://localhost:4000",
        "https://mern-ecommerce-website-v9ns.onrender.com"
      );
      await p.save();
      count++;
    }

    console.log("✅ Updated documents:", count);
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

fixImages();
