import styles from "./HomeSection.module.css";
import logoutIcon from "../../assets/icons/logout.svg";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import PriceOpt from '../../assets/icons/priceOpt.png';
import CreateProduct from '../../assets/icons/CreateProduct.png';
import bcgLogo from '../../assets/icons/bcg-logo.png';

const HomeSection = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <div className={styles.bcgLogo}>
       <img src={bcgLogo} alt="bcg-logo"/>
      </div>
      <h1 className={styles.title}>Price Optimization Tool</h1>
      <p className={styles.subtitle}>
      Turn Insights into Revenue with Smart Pricing – Leverage data-driven analytics to optimize your pricing strategy, maximize profits, and stay ahead in a competitive market.
      </p>
      <div className={styles['logout-container']} onClick={handleLogout}>
        <h5>Logout</h5>
        <img src={logoutIcon} alt="logoutIcon"></img>
      </div>
      <div className={styles.features}>
        <FeatureCard
          title="Create and Manage Product"
          description="Effortlessly Add, Edit, and Organize Your Product Listings"
          link="/products"
          image={CreateProduct}
        />
        <FeatureCard
          title="Pricing Optimization"
          description="Automatically Optimize Prices to Maximize Profits"
          link="/pricing"
          image={PriceOpt}
        />
      </div>
    </div>
  );
};

export default HomeSection;
