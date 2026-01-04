import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getTotalItems } = useContext(ShopContext);

  const authToken = localStorage.getItem("auth-token");

  return (
    <div className="navbar">

      {/* LOGO */}
      <div className="nav-logo">
        <img src={logo} alt="Shopper logo" />
        <p>Flyon</p>
      </div>

      {/* MOBILE MENU ICON */}
      <img
        src={nav_dropdown}
        alt="menu"
        className={`nav-dropdown ${mobileOpen ? "rotate" : ""}`}
        onClick={() => setMobileOpen(!mobileOpen)}
      />

      {/* NAV MENU */}
      <ul className={`nav-menu ${mobileOpen ? "nav-menu-visible" : ""}`}>
        {["shop","mens","womens","kids"].map((item) => (
          <li key={item} onClick={() => {
            setMenu(item);
            setMobileOpen(false);
          }}>
            <Link to={item === "shop" ? "/" : `/${item}`}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
            {menu === item && <hr />}
          </li>
        ))}
      </ul>

      {/* LOGIN + CART */}
      <div className="nav-login-cart">
        {authToken ? (
          <button onClick={() => {
            localStorage.removeItem("auth-token");
            window.location.replace("/");
          }}>
            Logout
          </button>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}

        <Link to="/cart" className="cart-icon-wrapper">
          <img src={cart_icon} alt="cart" />
          <span className="nav-cart-count">{getTotalItems()}</span>
        </Link>
      </div>

    </div>
  );
};

export default Navbar;
