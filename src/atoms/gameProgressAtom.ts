import { atom } from "recoil";
import { GameProgress } from "../types/GameProgressType";

export const gameProgressAtom = atom<GameProgress>({
    key: "gameProgressAtom", // 一意のキー
    default: "", // 初期値
});
