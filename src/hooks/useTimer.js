import { useEffect, useRef, useState } from "react";

export const TURN_SECONDS = 15;

const DEADLINE_STORAGE_KEY = "palabras-encadenadas-fin";

const loadDeadline = () => {
  try {
    return Number(sessionStorage.getItem(DEADLINE_STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
};

const saveDeadline = (deadline) => {
  try {
    sessionStorage.setItem(DEADLINE_STORAGE_KEY, String(deadline));
  } catch {
    // si no se puede guardar, el juego sigue igual
  }
};

export const useTimer = (onExpire) => {
  const [savedDeadline] = useState(loadDeadline);
  const [secondsLeft, setSecondsLeft] = useState(() =>
    savedDeadline
      ? Math.max(0, Math.ceil((savedDeadline - Date.now()) / 1000))
      : TURN_SECONDS,
  );
  const [isRunning, setIsRunning] = useState(savedDeadline > 0);
  const deadlineRef = useRef(savedDeadline);
  const remainingRef = useRef(0);
  const wasRunningRef = useRef(false);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      const msLeft = deadlineRef.current - Date.now();
      if (msLeft <= 0) {
        setSecondsLeft(0);
        setIsRunning(false);
        saveDeadline(0);
        onExpire();
      } else {
        setSecondsLeft(Math.ceil(msLeft / 1000));
      }
    }, 100);

    return () => clearInterval(id);
  }, [isRunning]);

  const restart = () => {
    deadlineRef.current = Date.now() + TURN_SECONDS * 1000;
    saveDeadline(deadlineRef.current);
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
    saveDeadline(deadlineRef.current);
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
    saveDeadline(0);
  };

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(TURN_SECONDS);
    wasRunningRef.current = false;
    saveDeadline(0);
  };

  return { secondsLeft, isRunning, restart, pause, resume, stop, reset };
};
