import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

// 🔗 Render backend URL
const BACKEND_URL = "https://mern-ecommerce-website-v9ns.onrender.com";

const AddProduct = () => {
  const [image, setImage] = useState(null);

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  // Handle input change
  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image selection
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // Add product function
  const Add_Product = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    let product = { ...productDetails };
    let responseData;

    // 1️⃣ Upload image
    let formData = new FormData();
    formData.append("product", image);

    try {
      const uploadResponse = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      responseData = await uploadResponse.json();

      // 2️⃣ If upload success → save product
      if (responseData.success) {
        product.image = responseData.image_url;

        await fetch(`${BACKEND_URL}/addproduct`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        alert("Product Added Successfully ✅");

        // Reset form
        setProductDetails({
          name: "",
          image: "",
          category: "women",
          new_price: "",
          old_price: "",
        });
        setImage(null);
      } else {
        alert("Image upload failed ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="add-product">
      {/* Product Title */}
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          type="text"
          name="name"
          placeholder="Type here"
          value={productDetails.name}
          onChange={changeHandler}
        />
      </div>

      {/* Price Section */}
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Old Price</p>
          <input
            type="text"
            name="old_price"
            placeholder="Type here"
            value={productDetails.old_price}
            onChange={changeHandler}
          />
        </div>

        <div className="addproduct-itemfield">
          <p>New Price</p>
          <input
            type="text"
            name="new_price"
            placeholder="Type here"
            value={productDetails.new_price}
            onChange={changeHandler}
          />
        </div>
      </div>

      {/* Category */}
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          value={productDetails.category}
          onChange={changeHandler}
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      {/* Upload Image */}
      <div className="addproduct-itemfield">
        <p>Upload Image</p>

        <label htmlFor="file-input" className="upload-label">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-img"
            alt="Upload"
          />
        </label>

        <input
          id="file-input"
          type="file"
          accept="image/*"
          hidden
          onChange={imageHandler}
        />
      </div>

      {/* Add Button */}
      <button onClick={Add_Product} className="addproduct-btn">
        ADD PRODUCT
      </button>
    </div>
  );
};

export default AddProduct;
