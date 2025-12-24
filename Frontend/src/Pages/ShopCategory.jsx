import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';

import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  const normalizedCategory = (props.category || '')
    .toString()
    .trim()
    .toLowerCase();

  return (
    <>
      <div className="shop-category">
        {props.banner && (
          <img
            className="shopcategory-banner"
            src={props.banner}
            alt={`${props.category} banner`}
          />
        )}

        <div className="shopcategory-indexSort">
          <p>
            <span>Showing 1-12</span> out of {all_product.length} products
          </p>
          <div className="shopcategory-sort">
            Sort by <img src={dropdown_icon} alt="sort" />
          </div>
        </div>
      </div>

      <div className="shopcategory-products">
        {all_product
          .filter(
            (item) =>
              (item.category || '')
                .toString()
                .trim()
                .toLowerCase() === normalizedCategory
          )
          .map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}

        <div className="shopcategory-loadmore">EXPLORE MORE</div>
      </div>
    </>
  );
};

export default ShopCategory;
