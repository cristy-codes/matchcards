import "./actionbar.css";
import { Button } from "evergreen-ui";
import React from "react";

const ActionBar = (props) => {
  const { start, stop, reset, isRunning } = props;
  return (
    <div className="actionbar">
      <Button onClick={start} disabled={isRunning}>
        start
      </Button>
      <Button onClick={stop} disabled={!isRunning}>pause</Button>
      <Button onClick={reset}>reset</Button>
    </div>
  );
};

export default ActionBar;
