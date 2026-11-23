import { useEffect, useRef, useState } from "react";

const TURN_SECONDS = 15;

export const useTimer = (onExpire) => {
  const [secondsLeft, setSecondsLeft] = useState(TURN_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const deadlineRef = useRef(0);
  const remainingRef = useRef(0);
  const wasRunningRef = useRef(false);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      const msLeft = deadlineRef.current - Date.now();
      if (msLeft <= 0) {
        setSecondsLeft(0);
        setIsRunning(false);
        onExpire();
      } else {
        setSecondsLeft(Math.ceil(msLeft / 1000));
      }
    }, 200);

    return () => clearInterval(id);
  }, [isRunning]);

  const restart = () => {
    deadlineRef.current = Date.now() + TURN_SECONDS * 1000;
    setSecondsLeft(TURN_SECONDS);
    setIsRunning(true);
  };

  const pause = () => {
    wasRunningRef.current = isRunning;
    remainingRef.current = deadlineRef.current - Date.now();
    setIsRunning(false);
  };

  const resume = () => {
    if (!wasRunningRef.current) return;
    deadlineRef.current = Date.now() + remainingRef.current;
    setIsRunning(true);
  };

  const stop = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(TURN_SECONDS);
    wasRunningRef.current = false;
  };

  return { secondsLeft, isRunning, restart, pause, resume, stop, reset };
};
