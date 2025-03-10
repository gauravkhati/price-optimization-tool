import styles from "./FeatureCard.module.css";
import ArrowIcon from "../../assets/icons/arrowIcon.svg";
interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
  image: string;
}

const FeatureCard = ({ title, description, link, image }: FeatureCardProps) => {
  return (
    <div className={styles.card}>
      <div>
        <img src={image} alt="PriceOpt" className={styles.cardImage} />
      </div>
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
