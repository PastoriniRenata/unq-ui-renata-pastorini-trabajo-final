export const normalizeWord = (word) => {
  return word
    .trim() // borra los espacios al principio y al final
    .toLowerCase() // pone todo en minuscula
    .normalize("NFD") //separa los caracteres:'niño' → n i n ~ o
    .replace(/[\u0300-\u0302\u0304-\u036f]/g, "") // son los codigos para los acentos y dieresis, saltea el codigo de la barrita de la ñ
    .normalize("NFC"); // vuelve a juntar n + ~ en ñ
};

//Validaciones
// PRECONDICION: recibo las palabras ya normalizadas

// No vacía: que hayan escrito algo.
export const isEmpty = (word) => word.trim() === "";

// Una sola palabra: sin espacios en el medio.
export const isSingleWord = (word) => !word.includes(" ");

// Solo letras: sin números, símbolos ni signos.
export const hasOnlyLetters = (word) => /^[a-zñ]+$/.test(word);

// Palabras de una letra: solo a, e, o, u, y. La API también acepta "i" y "d", pero no son palabras.
const SINGLE_LETTER_WORDS = ["a", "e", "o", "u", "y"];

export const isValidLength = (word) =>
  word.length >= 2 || SINGLE_LETTER_WORDS.includes(word);


// Encadenamiento: que empiece con la última letra de la palabra anterior. No aplica a la primera palabra.
export const isChained = (word, previousWord) => {
  if (!previousWord) return true;
  const lastLetter = previousWord.at(-1);
  const firstLetter = word.at(0);

  return lastLetter === firstLetter;
};

// Repetida: se fija si la palabra dada ya se encuentra entre las palabras de la cadena
export const repeatedWord = (word, previousWords) =>
  previousWords.some((w) => w.normalized === word);
