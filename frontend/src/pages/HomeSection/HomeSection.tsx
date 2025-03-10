import styles from "./HomeSection.module.css";
import logoutIcon from "../../assets/icons/logout.svg";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import PriceOpt from '../../assets/icons/priceOpt.png';
import CreateProduct from '../../assets/icons/CreateProduct.png';


const HomeSection = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Price Optimization Tool</h1>
      <p className={styles.subtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
      </p>
      <div className={styles['logout-container']} onClick={handleLogout}>
        <h5>Logout</h5>
        <img src={logoutIcon} alt="logoutIcon"></img>
      </div>

      <div className={styles.features}>
        <FeatureCard
          title="Create and Manage Product"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          link="/products"
          image={CreateProduct}
        />
        <FeatureCard
          title="Pricing Optimization"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          link="/pricing"
          image={PriceOpt}
        />
      </div>
    </div>
  );
};

export default HomeSection;
