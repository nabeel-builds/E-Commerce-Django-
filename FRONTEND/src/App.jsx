import ProductList from "../src/pages/ProductList.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProductDetails from "../src/pages/ProductDetails.jsx";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage.jsx";

function App() {
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/checkout" element={<CheckoutPage/>} />
      </Routes>
    </Router>
  )
}

export default App