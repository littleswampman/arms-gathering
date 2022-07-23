export const roomEventArray = [
    "battle",
    "spring",
    "statue",
    "treasure-chest",
    "staircase",
    "",
] as const;

export type RoomEvent = typeof roomEventArray[number];
