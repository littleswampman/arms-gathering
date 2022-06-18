import { atom } from "recoil";
import { displayedText } from "../types/displayedText";

export const displayedTextState = atom<displayedText>({
    key: "displayedText", // 一意のキー
    default: { texts: ["テキスト見本"] }, // 初期値
});
