import logo from "./logo.svg";
import "./App.css";
import useMatchCard from "./use-match-card";
import Card from "./Card";

function App() {
  const cardsCount = 6;
  const [
    isRunning,
    start,
    stop,
    reset,
    onCardClick,
    internalData,
    currentlySelectedCards,
    matched,
  ] = useMatchCard(6, ["smiley", "action", "chevron"]);

  console.log(internalData);
  return (
    <div
      className="card-grid"
      style={{
        gridTemplateColumns: new Array(internalData[0]?.length)
          .fill("1fr")
          .join(" "),
      }}
    >
      <button onClick={start}>start</button>
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
            />
          );
        });
      })}
    </div>
  );
}

export default App;
