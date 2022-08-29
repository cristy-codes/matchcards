import { useEffect, useState } from "react";

const useTimer = (interval) => {
  const [startTime, setStartTime] = useState();
  const [elapsed, setElapsed] = useState();
  const [timer, setTimer] = useState();
  const [isRunning, setIsRunning] = useState();

  const start = () => {
    setStartTime(Date.now());
  };

  const pause = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    setTimeout(() => {
      const e = (Date.now() - startTime) / interval;
      setElapsed(e);

      if (!isRunning) {
        setTimer((prev) => prev + e);
      }
    }, interval);
  }, []);

  return [start, pause];
};

useTimer.SECONDS = 1000;

export default useTimer;
