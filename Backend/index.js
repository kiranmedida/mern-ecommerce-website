const port = 4000;

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// ----------------- MongoDB Connection -----------------
const user = "kiranmedida";
const pass = encodeURIComponent("virat@9009");
const host = "cluster0.7egsdiz.mongodb.net";
const db = "e-commerce";

const uri = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ----------------- Create Upload Folder -----------------
const uploadDir = path.join(__dirname, "upload", "images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ----------------- Multer Setup -----------------
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

// ----------------- Routes -----------------
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Upload route
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.json({ success: 0, message: "No file uploaded" });
  }

  return res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// ----------------- Product Model -----------------
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

// Add product
app.post("/addproduct", async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

    const product = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving product" });
  }
});

// Remove product
app.post("/removeproduct", async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

// Get all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

// ----------------- Users Model -----------------
const Users = mongoose.model("Users", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  date: { type: Date, default: Date.now },
});

// Signup route
app.post("/signup", async (req, res) => {
  try {
    let check = await Users.findOne({ email: req.body.email });
    if (check)
      return res.json({ success: false, errors: "User already exists" });

    let cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });

    await user.save();

    const token = jwt.sign({ user: { id: user._id } }, "secret_ecom");
    res.json({ success: true, token });
  } catch {
    res.json({ success: false });
  }
});

// Login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });

  if (!user)
    return res.json({ success: false, errors: "Wrong Email Id" });

  if (req.body.password !== user.password)
    return res.json({ success: false, errors: "Wrong Password" });

  const token = jwt.sign({ user: { id: user._id } }, "secret_ecom");
  res.json({ success: true, token });
});

// ----------------- JWT Middleware -----------------
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).send({ error: "Please authenticate" });

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch {
    res.status(401).send({ error: "Invalid token" });
  }
};
// Get full cart of logged-in user
app.post("/getcart", fetchUser, async (req, res) => {
  try {
    let userData = await Users.findById(req.user.id);
    res.json({ success: true, cartData: userData.cartData });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// ----------------- CART ROUTES -----------------

// ADD TO CART
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added",req.body.itemId);
  let userData = await Users.findById(req.user.id);
  userData.cartData[req.body.itemId] += 1;

  await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

  res.send({ success: true });
});

// REMOVE FROM CART
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed",req.body.itemId);
  let userData = await Users.findById(req.user.id);

  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;

  await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

  res.send({ success: true });
});
app.post('/getcart',fetchUser, async (req, res)=>{
console.log("GetCart");
let userData = await Users.findOne({_id:req.user.id});
res.json(userData.cartData);})


// ----------------- Start Server -----------------
app.listen(port, () => console.log("Server Running on Port " + port));

