import React, { useContext, useState, useRef } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalItems } = useContext(ShopContext);

  const menuRef = useRef(null);

  // Toggle mobile dropdown menu
  const dropdown_toggle = () => {
    if (!menuRef.current) return;
    menuRef.current.classList.toggle("nav-menu-visible");
  };

  const authToken = localStorage.getItem("auth-token");

  return (
    <div className="navbar">

      {/* LOGO */}
      <div className="nav-logo">
        <img src={logo} alt="Shopper logo" />
        <p>Flyon</p>
      </div>

      {/* DROPDOWN ICON (mobile) */}
      <img
        src={nav_dropdown}
        alt="menu"
        className="nav-dropdown"
        onClick={dropdown_toggle}
      />

      {/* NAV MENU */}
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu('shop')}>
          <Link to="/" style={{ textDecoration: "none" }}>Shop</Link>
          {menu === 'shop' && <hr />}
        </li>

        <li onClick={() => setMenu('mens')}>
          <Link to="/mens" style={{ textDecoration: "none" }}>Men</Link>
          {menu === 'mens' && <hr />}
        </li>

        <li onClick={() => setMenu('womens')}>
          <Link to="/womens" style={{ textDecoration: "none" }}>Women</Link>
          {menu === 'womens' && <hr />}
        </li>

        <li onClick={() => setMenu('kids')}>
          <Link to="/kids" style={{ textDecoration: "none" }}>Kids</Link>
          {menu === 'kids' && <hr />}
        </li>
      </ul>

      {/* LOGIN + CART */}
      <div className="nav-login-cart">
        {authToken ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="cart" />
        </Link>

        <div className="nav-cart-count">{getTotalItems()}</div>
      </div>

    </div>
  );
};

export default Navbar;
