import styles from "./HeroSection.module.css";
import FeatureCard from "../FeatureCard/FeatureCard";
import logoutIcon from "../../assets/icons/logout.svg";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove token from localStorage
    navigate("/"); // Redirect to home page
  };
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Price Optimization Tool</h1>
      <p className={styles.subtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
      </p>
      <div className={styles['logout-container']}onClick={handleLogout}>
        <h5>Logout</h5>
        <img src={logoutIcon} alt="logoutIcon"></img>
      </div>

      <div className={styles.features}>
        <FeatureCard
          title="Create and Manage Product"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          link="/products"
        />
        <FeatureCard
          title="Pricing Optimization"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          link="/pricing"
        />
      </div>
    </div>
  );
};

export default HeroSection;
