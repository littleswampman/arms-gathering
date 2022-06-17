import { baseStatus } from "./status";

export const whereToWear = [
    "head",
    "rightHand",
    "leftHand",
    "body",
    "rightLeg",
    "leftLeg",
    "foot",
] as const;

export type arm = {
    whereToWear: typeof whereToWear[number];
    wearEffect: {
        status?: baseStatus;

        effect: number;
        memo?: string;
    }[];
};
