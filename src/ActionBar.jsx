import "./actionbar.css";
import { Button } from "evergreen-ui";
import React from "react";
import Select from "react-select";

const ActionBar = (props) => {
  const {
    start,
    stop,
    reset,
    isRunning,
    difficultyOptions,
    updateDifficulty,
    currentDifficulty,
  } = props;
  return (
    <div className="actionbar">
      <Button onClick={start} disabled={isRunning}>
        start
      </Button>
      <Button onClick={stop} disabled={!isRunning}>
        pause
      </Button>
      <Button onClick={reset}>reset</Button>
      <Select
        name="text-input-name"
        placeholder="Text input placeholder..."
        value={currentDifficulty}
        onChange={({ value }) => updateDifficulty(value)}
        options={difficultyOptions}
        isDisabled={isRunning}
      />
    </div>
  );
};

export default ActionBar;
