import styles from "./FeatureCard.module.css";
import ArrowIcon from "../../assets/icons/arrowIcon.svg";
interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
}

const FeatureCard = ({ title, description, link }: FeatureCardProps) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <div>
      <a href={link} className={styles.link}>
        <img src={ArrowIcon} alt="arrow" className={styles['arrow-icon']} />
      </a>
      </div>
    </div>
  );
};

export default FeatureCard;
