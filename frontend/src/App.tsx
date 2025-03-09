import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PricingOptimization from "./pages/PricingOptimisation";
import ProductManagement from "./pages/ProductManagement";
import HeroSection from "./components/HeroSection/HeroSection";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<HeroSection/>} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/pricing" element={<PricingOptimization />} />
        <Route path="*" element={<ErrorPage/> }/>
      </Routes>
    </Router>
    </>
  )
}

export default App
