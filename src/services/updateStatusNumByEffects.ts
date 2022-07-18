import { SetterOrUpdater } from "recoil";
import {
    baseStatusArray,
    baseStatusObject,
    BaseStatus,
} from "../types/BaseStatusType";

import { AllStatus } from "../types/AllStatusType";

// NOTE もう少し綺麗な実装に出来ないものか
export const updateStatusNumByEffects = (
    effects: { status: keyof BaseStatus; effect: number }[],
    setAllStatus: SetterOrUpdater<AllStatus>,
    allStatus: AllStatus,
) => {
    const updatedBaseStatus = JSON.parse(
        JSON.stringify(baseStatusObject),
    ) as BaseStatus;

    const changedStatus = baseStatusArray.map((status) => {
        const statusEffect = effects.filter((effect) =>
            effect ? effect.status === status : false,
        );
        const effect =
            status !== "hp"
                ? allStatus[status] +
                  (statusEffect.length !== 0 ? statusEffect[0].effect : 0)
                : allStatus.maxHp +
                  (statusEffect.length !== 0 ? statusEffect[0].effect : 0);

        return effect;
    });

    baseStatusArray.forEach((status, i) => {
        updatedBaseStatus[status] = changedStatus[i];
    });
    const updatedAllStatus: AllStatus = {
        ...allStatus,
        ...updatedBaseStatus,
        maxHp: updatedBaseStatus.hp,
        hp: allStatus.hp,
    };
    setAllStatus(updatedAllStatus);

    return updatedAllStatus;
};
