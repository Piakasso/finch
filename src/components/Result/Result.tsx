import styles from "./Result.module.css";
import winner from "../../assets/win.gif";
import loser from "../../assets/lose.gif";

const Result = ({ result }: { result: boolean }) => {
  const resultTitle = result
    ? "Ого вы выиграли! Поздравляем!"
    : "Попробуй следующий раз";
  return (
    <div className={styles.resultText}>
      <span>{resultTitle}</span>
      <img src={result ? winner : loser} alt="result" />
    </div>
  );
};

export default Result;
