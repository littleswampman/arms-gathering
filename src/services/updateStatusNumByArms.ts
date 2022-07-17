import { SetterOrUpdater } from "recoil";
import { Arm } from "../types/ArmType";
import {
    baseStatusArray,
    baseStatusObject,
    BaseStatus,
} from "../types/BaseStatusType";

import { AllStatus } from "../types/AllStatusType";

// NOTE もう少し綺麗な実装に出来ないものか
export const updateStatusNumByArm = (
    arms: Arm[],
    setAllStatus: SetterOrUpdater<AllStatus>,
    allStatus: AllStatus,
) => {
    const changedStatus = baseStatusArray
        .map((status) =>
            arms
                .map((arm) =>
                    arm.wearEffect.map((effect) => ({
                        [effect.status]: effect.effect,
                    })),
                )
                .map((effects) =>
                    effects.filter((where) => status === Object.keys(where)[0]),
                ),
        )
        .map((effectsGroupByStatus) =>
            effectsGroupByStatus.reduce(
                (prev_i, effects) =>
                    prev_i +
                    effects.reduce(
                        (prev_j, effect) =>
                            prev_j + effect[Object.keys(effect)[0]],
                        0,
                    ),
                0,
            ),
        );

    const updatedBaseStatus = JSON.parse(
        JSON.stringify(baseStatusObject),
    ) as BaseStatus;

    baseStatusArray.forEach((status, i) => {
        updatedBaseStatus[status] = allStatus[status] + changedStatus[i];
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
