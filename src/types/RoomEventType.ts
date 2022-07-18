export const roomEventArray = [
    "battle",
    "spring",
    "statue",
    "treasure-chest",
    "",
] as const;

export type RoomEvent = typeof roomEventArray[number];
