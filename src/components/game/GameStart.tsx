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

    useEffect(() => {
        // NOTE もう少し綺麗な実装に出来ないものか
        const updateStatusByArm = (arms: Arm[]) => {
            const changedStatus = baseStatusArray
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
                updatedStatus[status] = allStatus[status] + changedStatus[i];
            });

            setAllStatus({ ...allStatus, ...updatedStatus });
        };
        updateStatusByArm(allStatus.arms);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allStatus.arms, setAllStatus]);

    // NOTE 開発用のconsole.log
    useEffect(() => {
        console.log(allStatus);
    }, [allStatus]);

    return <div>GameStart</div>;
};
