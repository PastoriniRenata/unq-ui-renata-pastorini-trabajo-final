import { TURN_SECONDS } from "../hooks/useTimer";

const TimeBar = ({ secondsLeft, isRunning }) => {
  const step = Math.max(0, isRunning && secondsLeft === 1 ? 0 : secondsLeft);
  const color =
    secondsLeft <= 3 ? "text-bg-danger" : secondsLeft <= 7 ? "text-bg-warning" : "text-bg-success";

  return (
    <div
      className="progress mx-3"
      role="progressbar"
      aria-label="Tiempo restante"
      aria-valuemin="0"
      aria-valuemax={TURN_SECONDS}
      aria-valuenow={secondsLeft}
    >
      <div
        className={`progress-bar progress-bar-striped ${isRunning ? "progress-bar-animated" : ""} font-pixel time-${step} ${color}`}
      >
        {secondsLeft}
      </div>
    </div>
  );
};

export default TimeBar;