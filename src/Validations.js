export const normalizeWord = (word) => {
  return word
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u0302\u0304-\u036f]/g, "")
    .normalize("NFC");
};

//Validaciones
export const isEmpty = (word) => word.trim() === "";

export const isSingleWord = (word) => !word.includes(" ");

export const hasOnlyLetters = (word) => /^[a-zñ]+$/.test(word);

export const isValidLength = (word) => word.length >= 2;

export const isChained = (word, previousWord) => {
  if (!previousWord) return true;
  const lastLetter = previousWord.at(-1);
  const firstLetter = word.at(0);

  return lastLetter === firstLetter;
};

export const isRepeatedWord = (word, previousWords) =>
  previousWords.some((w) => w.normalized === word);
