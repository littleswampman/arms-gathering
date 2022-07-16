import { selector } from "recoil";
import { gameProgressAtom } from "../atoms/gameProgressAtom";
import { GameProgress } from "../types/GameProgress";

export const gameProgressSelector = selector<GameProgress>({
    key: "gameProgressSelector",
    get: ({ get }) => get(gameProgressAtom),
});
