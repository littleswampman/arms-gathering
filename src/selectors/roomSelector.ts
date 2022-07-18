import { selector } from "recoil";
import { roomAtom } from "../atoms/roomAtom";
import { Room } from "../types/RoomType";

export const roomSelector = selector<Room>({
    key: "roomSelector",
    get: ({ get }) => get(roomAtom),
});
