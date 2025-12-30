import { Link } from "react-router-dom";

const BACKEND_URL = "https://mern-ecommerce-website-v9ns.onrender.com";

const Item = (props) => {
  let imageSrc = props.image;

  // If image is relative path, attach backend URL
  if (imageSrc && !imageSrc.startsWith("http")) {
    imageSrc = `${BACKEND_URL}${imageSrc}`;
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
