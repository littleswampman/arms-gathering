import { selector } from "recoil";
import { gameProgressAtom } from "../atoms/gameProgressAtom";
import { GameProgress } from "../types/GameProgressType";

export const gameProgressSelector = selector<GameProgress>({
    key: "gameProgressSelector",
    get: ({ get }) => get(gameProgressAtom),
});
