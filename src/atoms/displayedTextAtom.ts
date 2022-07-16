import { atom } from "recoil";
import { DisplayedText } from "../types/DisplayedTextType";

export const displayedTextAtom = atom<DisplayedText>({
    key: "displayedText", // 一意のキー
    default: { texts: ["テキスト見本"] }, // 初期値
});
