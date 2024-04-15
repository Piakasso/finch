import styles from "./GameField.module.css";

import TicketDescription from "../TicketDescription/TicketDescription";
import TicketCell from "../TicketCell/TicketCell";
import GameFieldTitle from "../GameFieldTitle/GameFieldTitle";

import {
  firstFieldNumbers,
  secondFieldNumbers,
} from "../../constants/constants";
import { IGameField } from "../../types/types";

const GameField = ({
  handleNumberClick,
  choosenNums,
  handleCheckResult,
}: IGameField) => {
  return (
    <>
      <TicketDescription>
        <GameFieldTitle
          name="Поле 1"
          additionalText={
            choosenNums.firstField.length !== 8
              ? `Отметьте ${8 - choosenNums.firstField.length} цифр`
              : "Все поля выбраны"
          }
        />
        <div className={styles.numField}>
          {firstFieldNumbers.map((cell) => (
            <TicketCell
              data="firstField"
              handleNumberClick={handleNumberClick}
              key={cell}
              active={choosenNums.firstField.includes(cell)}
            >
              {cell}
            </TicketCell>
          ))}
        </div>
        <GameFieldTitle
          name="Поле 2"
          additionalText={
            choosenNums.secondField.length !== 1
              ? `Отметьте ${1 - choosenNums.secondField.length} цифрy`
              : "Поле выбрано"
          }
        />
        <div className={styles.numField}>
          {secondFieldNumbers.map((cell) => (
            <TicketCell
              handleNumberClick={handleNumberClick}
              key={cell}
              data="secondField"
              active={choosenNums.secondField.includes(cell)}
            >
              {cell}
            </TicketCell>
          ))}
        </div>
        <button
          className={`${styles.resultButton} ${
            choosenNums.firstField.length === 8 &&
            choosenNums.secondField.length === 1
              ? styles.activeButton
              : ""
          }`}
          disabled={
            choosenNums.firstField.length !== 8 &&
            choosenNums.secondField.length !== 1
          }
          onClick={() => {
            handleCheckResult();
          }}
        >
          Показать результат
        </button>
      </TicketDescription>
    </>
  );
};

export default GameField;
