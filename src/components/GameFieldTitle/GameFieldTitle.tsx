import styles from "./GameFieldTitle.module.css";

const GameFieldTitle = ({
  name,
  additionalText,
}: {
  name?: string;
  additionalText: string;
}) => {
  return (
    <h3 className={styles.gameFieldTitle}>
      <span>{name}</span>
      <span className={styles.additionalText}>{additionalText}</span>
    </h3>
  );
};

export default GameFieldTitle;
