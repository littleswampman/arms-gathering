import { BaseStatus } from "./BaseStatus";

export const whereToWear = [
    "head",
    "rightHand",
    "leftHand",
    "body",
    "rightLeg",
    "leftLeg",
    "foot",
] as const;

export type Arm = {
    whereToWear: typeof whereToWear[number];
    wearEffect: {
        status?: keyof BaseStatus;

        effect: number;
        memo?: string;
    }[];
};
