import ProductList from "../src/pages/ProductList.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProductDetails from "../src/pages/ProductDetails.jsx";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import PrivateRouter from "./components/PrivateRouter.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route element={<PrivateRouter/>} >
        <Route path="/checkout" element={<CheckoutPage/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  )
}

export default App