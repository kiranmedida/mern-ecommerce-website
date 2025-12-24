import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  // ✅ UNIVERSAL IMAGE URL HANDLER
  let imageSrc = props.image;

  if (
    imageSrc &&
    !imageSrc.startsWith("http://") &&
    !imageSrc.startsWith("https://")
  ) {
    // backend serves images from port 4000
    imageSrc = `http://localhost:4000${
      imageSrc.startsWith("/") ? "" : "/"
    }${imageSrc}`;
  }

  return (
    <div className="item">
      <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
        <img
          src={imageSrc}
          alt={props.name}
          style={{
            width: "100%",
            height: "280px",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Link>

      <p>{props.name}</p>

      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>
    </div>
  );
};

export default Item;
