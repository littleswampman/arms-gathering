import { atom } from "recoil";
import { Room } from "../types/RoomType";

export const roomAtom = atom<Room>({
    key: "roomAtom", // 一意のキー
    default: { event: "" }, // 初期値
});
