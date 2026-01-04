import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import "./Item.css";

const Item = (props) => {
  const imageSrc = props.image.startsWith("http")
    ? props.image
    : `${BACKEND_URL}${props.image}`;

  return (
    <div className="item">
      <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
        <img src={imageSrc} alt={props.name} />
      </Link>

      <p className="item-name">{props.name}</p>

      <div className="item-prices">
        <span className="item-price-new">${props.new_price}</span>
        <span className="item-price-old">${props.old_price}</span>
      </div>
    </div>
  );
};

export default Item;
