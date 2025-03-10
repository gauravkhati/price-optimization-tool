import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import PricingOptimization from "./pages/PricingOptimisation";
import ProductManagement1 from "./pages/ProductManagement1";
import HeroSection from "./components/HeroSection/HeroSection";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import { useEffect } from "react";

export const isTokenValid = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false; 

  try {
    const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode token payload
    return exp * 1000 > Date.now(); // Token must be valid
  } catch (error) {
    return false; // Token is invalid
  }
};

function App() {
  

  return (
    <>
    <Router>
      <AuthChecker/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<HeroSection/>} />
        <Route path="/products" element={<ProductManagement1 />} />
        <Route path="/pricing" element={<PricingOptimization />} />
        <Route path="*" element={<ErrorPage/> }/>
      </Routes>
    </Router>
    </>
  )
}
const AuthChecker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      if (!isTokenValid()) {
        localStorage.removeItem("accessToken");
        navigate("/");
      }
    };

    checkToken(); // Check once on mount

    const interval = setInterval(checkToken, 60000); // Check every 60 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return null; // This component doesn't render anything
};

export default App
