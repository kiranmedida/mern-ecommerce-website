const port = 4000;

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

/* ----------------- MIDDLEWARE ----------------- */
app.use(express.json({ limit: "20mb" }));
app.use(cors());

/* ----------------- MongoDB Connection ----------------- */
const user = "kiranmedida";
const pass = encodeURIComponent("virat@9009");
const host = "cluster0.7egsdiz.mongodb.net";
const db = "e-commerce";

const uri = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

/* ----------------- Create Upload Folder ----------------- */
const uploadDir = path.join(__dirname, "upload", "images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ----------------- Serve Images PUBLICLY ----------------- */
app.use("/images", express.static(uploadDir));

/* ----------------- Multer Setup ----------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const safeName = base.replace(/\s+/g, "_");
    cb(null, "product_" + Date.now() + "_" + safeName + ext);
  },
});

const upload = multer({ storage });

/* ----------------- Base Route ----------------- */
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

/* ----------------- Upload Image ----------------- */
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: "No file uploaded" });
  }

  res.json({
    success: true,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

/* ----------------- Product Model ----------------- */
const Product = mongoose.model("Product", {
  id: Number,
  name: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,
  available: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

/* ----------------- Add Product ----------------- */
app.post("/addproduct", async (req, res) => {
  try {
    const products = await Product.find({});
    const id = products.length
      ? products[products.length - 1].id + 1
      : 1;

    const product = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    res.json({ success: true });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ success: false });
  }
});

/* ----------------- Remove Product ----------------- */
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

/* ----------------- Get All Products ----------------- */
app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/* ----------------- NEW COLLECTIONS ----------------- */
app.get("/newcollections", async (req, res) => {
  const products = await Product.find({})
    .sort({ date: -1 })
    .limit(8);
  res.json(products);
});

/* ----------------- User Model ----------------- */
const Users = mongoose.model("Users", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
});

/* ----------------- Signup ----------------- */
app.post("/signup", async (req, res) => {
  const exists = await Users.findOne({ email: req.body.email });
  if (exists) return res.json({ success: false });

  let cart = {};
  for (let i = 0; i <= 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const token = jwt.sign({ user: { id: user._id } }, "secret_ecom");
  res.json({ success: true, token });
});

/* ----------------- Login ----------------- */
app.post("/login", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.json({ success: false });

  if (req.body.password !== user.password)
    return res.json({ success: false });

  const token = jwt.sign({ user: { id: user._id } }, "secret_ecom");
  res.json({ success: true, token });
});

/* ----------------- JWT Middleware ----------------- */
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

/* ----------------- Get Cart ----------------- */
app.post("/getcart", fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  res.json({ success: true, cartData: user.cartData });
});

/* ----------------- Add To Cart ----------------- */
app.post("/addtocart", fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  user.cartData[req.body.itemId] += 1;

  await Users.findByIdAndUpdate(req.user.id, {
    cartData: user.cartData,
  });

  res.json({ success: true });
});

/* ----------------- Remove From Cart ----------------- */
app.post("/removefromcart", fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);

  if (user.cartData[req.body.itemId] > 0)
    user.cartData[req.body.itemId] -= 1;

  await Users.findByIdAndUpdate(req.user.id, {
    cartData: user.cartData,
  });

  res.json({ success: true });
});

/* ----------------- Start Server ----------------- */
app.listen(port, () =>
  console.log("🚀 Server running on http://localhost:" + port)
);
