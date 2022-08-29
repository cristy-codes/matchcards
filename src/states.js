import { createMachine } from "xstate";

const machine = createMachine({
  id: "matchCards",
  initial: "idle",
  states: {
    idle: {
      on: {
        REVEAL: { target: "revealing" },
        CONTINUE: { target: "running" },
      },
    },
    revealing: {
      on: {
        CONTINUE: { target: "running" },
        RESET: { target: "idle" },
      },
    },
    running: {
      on: {
        STOP: { target: "stopped" },
        RESET: { target: "idle" },
      },
    },
    stopped: {
      on: { CONTINUE: { target: "running" }, RESET: { target: "idle" } },
    },
  },
});

export default machine;
