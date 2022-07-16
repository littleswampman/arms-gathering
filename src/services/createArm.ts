import { Arm, whereToWear } from "../types/ArmType";
import { BaseStatus, baseStatusArray } from "../types/BaseStatusType";

export const createArm = (
    luck: number,
    rare: number,
    specified?: typeof whereToWear[number],
) => {
    const wear =
        specified ??
        whereToWear[Math.floor(Math.random() * whereToWear.length)];
    const status =
        baseStatusArray[Math.floor(Math.random() * baseStatusArray.length)];
    const effect = Math.ceil(rare * 8 + luck * Math.random() * 1);

    return {
        whereToWear: wear,
        wearEffect: [
            {
                status,
                effect,
            },
        ],
    } as Arm;
};
