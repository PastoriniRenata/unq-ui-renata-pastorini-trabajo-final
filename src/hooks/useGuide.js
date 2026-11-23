import { useState } from "react";

const GUIDE_SEEN_STORAGE_KEY = "palabras-encadenadas-guia-vista";

const loadGuideSeen = () => {
  try {
    return localStorage.getItem(GUIDE_SEEN_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

export const useGuide = () => {
  const [isGuideOpen, setIsGuideOpen] = useState(() => !loadGuideSeen());

  const openGuide = () => setIsGuideOpen(true);

  const closeGuide = () => {
    setIsGuideOpen(false);
    try {
      localStorage.setItem(GUIDE_SEEN_STORAGE_KEY, "true");
    } catch {
      // si no se puede guardar, la guía vuelve a aparecer la próxima vez
    }
  };

  return { isGuideOpen, openGuide, closeGuide };
};