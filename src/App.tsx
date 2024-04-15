import { useEffect, useState } from "react";
import magicWand from "./assets/magic-wand.svg";
import "./App.css";

import GameField from "./components/GameField/GameField";
import TicketTitle from "./components/TicketTitle/TicketTitle";
import Result from "./components/Result/Result";

import { generateRandomNumbers } from "./helpers";
import { INumbers } from "./types/types";

const initialState = {
  firstField: [],
  secondField: [],
};

function App() {
  const [winnerNums, setIsWinnerNums] = useState<INumbers>(initialState);
  const [choosenNums, setIsChoosenNums] = useState<INumbers>(initialState);
  const [isShowResult, setIsShowResult] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const handleShuffleChoose = () => {
    setIsChoosenNums(generateRandomNumbers(8));
  };

  const resetError = () => {
    setIsError(false);
    setIsChoosenNums(initialState);
    setIsShowResult(false);
  };

  const handleCheckResult = async () => {
    let matchOfFirstField = 0;
    let matchOfSecondField = 0;

    for (let num of winnerNums.firstField) {
      if (choosenNums.firstField.includes(num)) {
        matchOfFirstField++;
      }
    }

    if (winnerNums.secondField[0] === choosenNums.secondField[0]) {
      matchOfSecondField++;
    }

    const postData = () => {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          selectedNumber: {
            firstField: choosenNums.firstField,
            secondField: choosenNums.secondField,
          },
          isTicketWon:
            matchOfFirstField >= 4 ||
            (matchOfFirstField >= 3 && matchOfSecondField > 0)
              ? true
              : false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((json) => {
          console.log(json);
          setIsShowResult(true);
          setIsWin(
            matchOfFirstField >= 4 ||
              (matchOfFirstField >= 3 && matchOfSecondField > 0)
              ? true
              : false
          );
        })
        .catch((error) => {
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Повторная попытка №${retryCount} через 2 секунды...`);
            setTimeout(postData, 2000);
          } else {
            console.error("Достигнуто максимальное количество попыток");
            setIsError(true);
          }
        });
    };

    let retryCount = 0;
    const maxRetries = 2;

    postData();
  };

  const handleNumberClick = (value: number, attribute: string) => {
    if (
      attribute === "firstField" &&
      choosenNums.firstField.length < 8 &&
      !choosenNums.firstField.includes(value)
    ) {
      setIsChoosenNums({
        ...choosenNums,
        firstField: [...choosenNums.firstField, value],
      });
    } else if (choosenNums.firstField.includes(value)) {
      setIsChoosenNums({
        ...choosenNums,
        firstField: choosenNums.firstField.filter((num) => num !== value),
      });
    }

    if (attribute === "secondField" && choosenNums.secondField.length < 1) {
      setIsChoosenNums({
        ...choosenNums,
        secondField: [...choosenNums.secondField, value],
      });
    } else if (choosenNums.secondField.includes(value)) {
      setIsChoosenNums({
        ...choosenNums,
        secondField: choosenNums.secondField.filter((num) => num !== value),
      });
    }
  };

  useEffect(() => {
    setIsWinnerNums(generateRandomNumbers(8));
  }, []);

  return (
    <div className="App">
      {!isError ? (
        <div className="ticket">
          {isShowResult ? (
            <>
              <TicketTitle name="Билет 1" />
              <Result result={isWin} />
            </>
          ) : (
            <>
              <TicketTitle name="Билет 1" />
              <button onClick={handleShuffleChoose} className="magicWand">
                <img src={magicWand} alt="magicWand" />
              </button>

              <GameField
                handleNumberClick={handleNumberClick}
                choosenNums={choosenNums}
                handleCheckResult={handleCheckResult}
              />
            </>
          )}
        </div>
      ) : (
        <div className="error">
          <span>NETWORK ERROR</span>
          <button className="errorButton" onClick={resetError}>
            на главную
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
