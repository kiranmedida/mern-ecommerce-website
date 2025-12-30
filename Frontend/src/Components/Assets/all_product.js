// all_product.js

const BACKEND_URL = "https://mern-ecommerce-website-v9ns.onrender.com";

let all_product = [
  // WOMEN
  {
    id: 1,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: `${BACKEND_URL}/images/product_1.png`,
    new_price: 50.0,
    old_price: 80.5,
  },
  {
    id: 2,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: `${BACKEND_URL}/images/product_2.png`,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 3,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: `${BACKEND_URL}/images/product_3.png`,
    new_price: 60.0,
    old_price: 100.5,
  },
  {
    id: 4,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: `${BACKEND_URL}/images/product_4.png`,
    new_price: 100.0,
    old_price: 150.0,
  },

  // MEN
  {
    id: 13,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: `${BACKEND_URL}/images/product_13.png`,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 14,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: `${BACKEND_URL}/images/product_14.png`,
    new_price: 85.0,
    old_price: 120.5,
  },

  // KIDS
  {
    id: 25,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: `${BACKEND_URL}/images/product_25.png`,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 26,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: `${BACKEND_URL}/images/product_26.png`,
    new_price: 85.0,
    old_price: 120.5,
  },
];

export default all_product;
