import { Room } from "../types/RoomType";
import { RoomEvent, roomEventArray } from "../types/RoomEventType";

export const createRoom = (specified?: typeof roomEventArray[number]) => {
    const event =
        specified ??
        roomEventArray[Math.floor(Math.random() * roomEventArray.length)];

    return {
        event,
    } as Room;
};
