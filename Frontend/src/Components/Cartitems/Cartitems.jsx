import React, { useContext } from 'react';
import './Cartitems.css';
import remove_icon from '../Assets/cart_cross_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const Cartitems = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);

  // compute subtotal from cartItems and all_product
  const subtotal = all_product.reduce((acc, p) => {
    const qty = cartItems[p.id] || 0;
    return acc + (Number(p.new_price || 0) * qty);
  }, 0);

  const shipping = 0; // change if you have shipping logic
  const total = subtotal + shipping;

  return (
    <div className='cartitems'>

      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr />

      {all_product.map((e) => {
        const qty = cartItems[e.id] || 0;
        if (qty > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format">
                {/* larger thumbnail */}
                <img
                  src={e.image}
                  alt={e.name}
                  className="carticon-product-icon"
                />

                {/* title */}
                <p>{e.name}</p>

                {/* unit price */}
                <p>${Number(e.new_price).toFixed(2)}</p>

                {/* quantity (static button as original) */}
                <button className="cartitems-quantity">{qty}</button>

                {/* total for that line */}
                <p>${(Number(e.new_price) * qty).toFixed(2)}</p>

                {/* remove */}
                <img
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt={`remove ${e.name}`}
                  className="remove-icon"
                />
              </div>

              <hr />
            </div>
          );
        }
        return null;
      })}

      {/* bottom area: totals (left) and promo (right) */}
      <div className="cartitems-bottom-row">
        <div className="cartitems-total">
          <h1>cart Totals</h1>

          <div className="cartitems-total-item">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <p>Shipping Fee</p>
            <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <h3>Total</h3>
            <h3>${total.toFixed(2)}</h3>
          </div>

          {/* Proceed button placed under totals */}
          <button className="checkout-btn">PROCEED TO CHECKOUT</button>
        </div>

        {/* Promo box to the right of totals */}
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cartitems;
