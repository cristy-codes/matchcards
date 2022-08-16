import { useEffect, useState } from "react";
import deepcopy from "deepcopy";

const defaultCard = { icon: "", index: [], isFaceDown: true, isMatched: false };

const useMatchCard = (numCards) => {
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState([]);

  const selected = data
    .map((row) => {
      return row.filter((col) => {
        return !col.isFaceDown && !col.isMatched;
      });
    })
    .flat();

  // check if match
  useEffect(() => {}, [selected]);

  const initialize = () => {
    const cols = Math.floor(Math.sqrt(numCards));
    const rows = Math.ceil(numCards / cols);

    const initialized = new Array(rows).fill(null).map((_, rowIdx) => {
      return new Array(cols).fill(null).map((_, colIdx) => {
        return {
          ...defaultCard,
          index: [rowIdx, colIdx],
          icon: "",
        };
      });
    });

    setData(initialized);
  };

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    stop();
    initialize();
    // need to reorganize elements in 2d array
  };

  const onCardClick = (row, col) => {
    if (isRunning && selected.length < 2) {
      setData((prev) => {
        prev[row][col].isFaceDown = false;
        return prev;
      });
      
    }
  };

  return [isRunning, start, stop, reset, onCardClick, data, selected];
};

export default useMatchCard;
