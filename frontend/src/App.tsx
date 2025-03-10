import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ErrorPage, HomePage, LoginPage, ProductManagementPage } from "./pages";
import { useEffect } from "react";
import { isTokenValid } from "./utils";

function App() {
  return (
    <>
      <Router>
        <AuthChecker />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductManagementPage dashboard={'product-management'}/>} />
          <Route path="/pricing" element={<ProductManagementPage dashboard={'cost-optimization'} />} />
          <Route path="*" element={<ErrorPage />} />
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
    checkToken();
    const interval = setInterval(checkToken, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  return null;
};

export default App
