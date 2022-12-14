import logo from "./logo.svg";
import "./App.css";
import useMatchCard from "./use-match-card";
import Card from "./Card";
import ActionBar from "./ActionBar";
import { useState } from "react";
import MatchCards from "./assets/MatchCards.svg";

// import icons all at once
const iconsFn = require.context("./card-icons", true, /\.svg$/);
const icons = iconsFn.keys().map((v) => iconsFn(v));

const numCards = [
  { label: "Easy (12)", value: 12 },
  { label: "Medium (16)", value: 16 },
  { label: "Hard (20)", value: 20 },
];

function App() {
  const [cardsCount, setCardsCount] = useState(numCards[1].value);
  const [
    isRunning,
    start,
    stop,
    reset,
    onCardClick,
    internalData,
    currentlySelectedCards,
    matched,
  ] = useMatchCard(cardsCount, icons);

  return (
    <div className="home">
      <div className="home__title">
        <img src={MatchCards} />
      </div>
      <div className="home__main">
        <div className="card-game">
          <ActionBar
            start={start}
            stop={stop}
            reset={reset}
            difficultyOptions={numCards}
            updateDifficulty={setCardsCount}
            isRunning={isRunning}
            currentDifficulty={numCards.find(
              ({ value }) => value === cardsCount
            )}
          />
          <div
            className="card-grid"
            style={{
              gridTemplateColumns: new Array(internalData[0]?.length)
                .fill("1fr ")
                .join(" "),
            }}
          >
            {internalData.map((row, rowIdx) => {
              return row.map((col, colIdx) => {
                return (
                  <Card
                    key={`${rowIdx}_${colIdx}`}
                    icon={col.icon}
                    onClick={() => onCardClick(rowIdx, colIdx)}
                    isFaceUp={currentlySelectedCards
                      .concat(matched)
                      .find((selectedCard) => {
                        return (
                          selectedCard.index[0] === rowIdx &&
                          selectedCard.index[1] === colIdx
                        );
                      })}
                    isMatched={matched.find((v) => {
                      return v.index[0] === rowIdx && v.index[1] === colIdx;
                    })}
                  />
                );
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
