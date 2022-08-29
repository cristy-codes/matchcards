import { useMachine } from "@xstate/react";
import { useEffect, useState } from "react";
import machine from "./states";

const defaultCard = { icon: "", index: [], isFaceDown: true, isMatched: false };

const useMatchCard = (numCards, icons) => {
  const [data, setData] = useState([]);
  const [current, send] = useMachine(machine);
  const { matches } = current;
  const isRunning = matches("running") || matches("revealing");
  const isIdle = matches("idle");
  const isRevealing = matches("revealing");

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

  const initialize = () => {
    const cols = Math.floor(Math.sqrt(numCards));
    const rows = Math.ceil(numCards / cols);

    const usableIcons = icons.slice(0, numCards / 2);
    const cardIcons = [...usableIcons, ...usableIcons];

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

  const endGame = () => {
    send("RESET");
  };

  const stop = () => {
    send("STOP");
  };

  const reset = () => {
    send("RESET");
    initialize();
  };

  const start = () => {
    if (isIdle) {
      reset();
      send("REVEAL");
    } else {
      send("CONTINUE");
    }
  };

  const onCardClick = (row, col) => {
    if (isRunning && selected.length < 2) {
      setData((prev) => {
        prev[row][col].isFaceDown = false;
        return [...prev];
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!isRunning) {
      initialize();
    }
  }, [numCards]);

  useEffect(() => {
    if (isRevealing) {
      setData((prev) =>
        prev.map((row) =>
          row.map((col) => ({ ...col, isFaceDown: !col.isFaceDown }))
        )
      );

      const timeout = setTimeout(() => {
        setData((prev) =>
          prev.map((row) =>
            row.map((col) => ({ ...col, isFaceDown: !col.isFaceDown }))
          )
        );
        send("CONTINUE");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isRevealing]);

  // check if match
  useEffect(() => {
    if (isRunning && selected.length === 2) {
      setTimeout(() => {
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
      }, 1000);
    }

    if (isRunning) {
      const isGameOver = data.every((row) => row.every((col) => col.isMatched));
      if (isGameOver) {
        endGame();
      }
    }
  }, [data]);

  return [isRunning, start, stop, reset, onCardClick, data, selected, matched];
};

export default useMatchCard;
