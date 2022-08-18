import { useEffect, useState } from "react";

const defaultCard = { icon: "", index: [], isFaceDown: true, isMatched: false };

const useMatchCard = (numCards, icons) => {
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState([]);

  const selected = data
    .map((row) => {
      return row.filter((col) => {
        return !col.isFaceDown && !col.isMatched;
      });
    })
    .flat();

  const matched = data
    .map((row) => {
      return row.filter((col) => {
        return col.isMatched;
      });
    })
    .flat();

  // check if match
  useEffect(() => {
    if (isRunning && selected.length === 2) {
      setData((prev) => {
        const [f0, f1] = selected[0].index;
        const [s0, s1] = selected[1].index;
        if (selected[0].icon === selected[1].icon) {
          prev[f0][f1].isMatched = true;
          prev[s0][s1].isMatched = true;
        } else {
          prev[f0][f1].isFaceDown = true;
          prev[s0][s1].isFaceDown = true;
        }
        return [...prev];
      });
    }
  }, [data]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    const cols = Math.floor(Math.sqrt(numCards));
    const rows = Math.ceil(numCards / cols);

    const cardIcons = [...icons, ...icons];

    const initialized = new Array(rows).fill(null).map((_, rowIdx) => {
      return new Array(cols).fill(null).map((_, colIdx) => {
        const r = Math.floor(Math.random() * cardIcons.length);
        const icon = cardIcons[r];
        cardIcons.splice(r, 1);
        return {
          ...defaultCard,
          index: [rowIdx, colIdx],
          icon,
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
        return [...prev];
      });
    }
  };

  return [isRunning, start, stop, reset, onCardClick, data, selected, matched];
};

export default useMatchCard;
