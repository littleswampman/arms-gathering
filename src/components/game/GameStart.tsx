import React, { FC, useEffect, useCallback } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Button } from "../Button";

import { DisplayedText } from "../../types/DisplayedTextType";
import { displayedTextAtom } from "../../atoms/displayedTextAtom";

import { AllStatus } from "../../types/AllStatusType";
import { allStatusAtom } from "../../atoms/allStatusAtom";
import { allStatusSelector } from "../../selectors/allStatusSelector";

import { GameProgress } from "../../types/GameProgressType";
import { gameProgressAtom } from "../../atoms/gameProgressAtom";
import { gameProgressSelector } from "../../selectors/gameProgressSelector";

import {
    baseStatusObject,
    baseStatusArray,
    BaseStatus,
} from "../../types/BaseStatusType";

import { Arm, whereToWear } from "../../types/ArmType";

export const GameStart = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);

    const setAllStatus: SetterOrUpdater<AllStatus> =
        useSetRecoilState(allStatusAtom);
    const allStatus = useRecoilValue(allStatusSelector);

    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);
    const gameProgress = useRecoilValue(gameProgressSelector);

    const updateStatusByArm = useCallback(
        (arms: Arm[]) => {
            const foo = baseStatusArray
                .map((status) =>
                    arms
                        .map((arm) =>
                            arm.wearEffect.map((effect) => ({
                                [effect.status]: effect.effect,
                            })),
                        )
                        .map((effects) =>
                            effects.filter(
                                (where) => status === Object.keys(where)[0],
                            ),
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

            const updatedStatus = JSON.parse(
                JSON.stringify(baseStatusObject),
            ) as BaseStatus;

            baseStatusArray.forEach((status, i) => {
                updatedStatus[status] = allStatus[status] + foo[i];
            });

            setAllStatus({ ...allStatus, ...updatedStatus });
        },
        [allStatus, setAllStatus],
    );

    useEffect(() => {
        updateStatusByArm(allStatus.arms);
    }, [allStatus.arms, updateStatusByArm]);

    return <div>GameStart</div>;
};
