import { atom } from "recoil";

export const displayedTextState = atom({
    key: "displayedTextState", // 一意のキー
    default: "テキスト見本", // 初期値
});
