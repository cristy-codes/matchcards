import logo from "./logo.svg";
import "./App.css";
import useMatchCard from "./use-match-card";
import Card from "./Card";
import ActionBar from "./ActionBar";

function App() {
  const cardsCount = 16;
  const [
    isRunning,
    start,
    stop,
    reset,
    onCardClick,
    internalData,
    currentlySelectedCards,
    matched,
  ] = useMatchCard(cardsCount, [
    "smiley",
    "action",
    "chevron",
    "a",
    "b",
    "c",
    "d",
    "e",
  ]);

  console.log(matched);
  return (
    <div className="home">
      <div className="card-game">
        <ActionBar
          start={start}
          stop={stop}
          reset={reset}
          isRunning={isRunning}
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
  );
}

export default App;
