import logo from "./logo.svg";
import "./App.css";
import useMatchCard from "./use-match-card";

const Card = () => null;

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
  ] = useMatchCard(6, ["smiley", "action", "chevron"]);

  return (
    <div className="App">
      {internalData.map((row, rowIdx) => {
        row.map((col, colIdx) => {
          return (
            <Card
              icon={col.icon}
              onClick={() => onCardClick(rowIdx, colIdx)}
              isFaceUp={currentlySelectedCards.find((selectedCard) => {
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
