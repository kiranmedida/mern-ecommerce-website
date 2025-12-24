import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import Seed from "./Pages/Seed";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <hr />
        <Routes>
          <Route path='/' element={<Shop />} />
           <Route path="/seed" element={<Seed />} />
          <Route
            path='/mens'
            element={<ShopCategory banner={men_banner} category="men" />}
          />

          <Route
            path='/womens'
            element={<ShopCategory banner={women_banner} category="women" />}
          />

          {/* 🔧 FIXED: path should be lowercase /kids */}
          <Route
            path='/kids'
            element={<ShopCategory banner={kid_banner} category="kid" />}
          />

          {/* 🔧 FIXED: single flat route for product details */}
          <Route
            path='/product/:productId'
            element={<Product />}
          />

          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path="/seed" element={<Seed />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
