/** @format */

import { wordsToHighLight } from "../constants";
export const highlightWord = (text: string) => {
  const escapedWords = wordsToHighLight.map((wordObj) =>
    wordObj.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (index % 2 !== 0) {
      const matchedWordObj = wordsToHighLight.find((item) =>
        new RegExp(item.word, "i").test(part),
      );
      return `<span class="${matchedWordObj?.className}">${part}</span>`;
    }
    return part;
  });
};
