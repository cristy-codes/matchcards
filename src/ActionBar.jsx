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
      <Button onClick={start} disabled={isRunning} intent={"success"}>
        Start
      </Button>
      <Button onClick={stop} disabled={!isRunning} intent={"danger"}>
        Pause
      </Button>
      <Button onClick={reset}>Reset</Button>
      <Select
        name="text-input-name"
        value={currentDifficulty}
        onChange={({ value }) => updateDifficulty(value)}
        options={difficultyOptions}
        isDisabled={isRunning}
      />
    </div>
  );
};

export default ActionBar;
