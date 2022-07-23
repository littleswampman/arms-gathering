import React, { FC, useState, useEffect } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Dialog } from "@headlessui/react";

import { Modal } from "../Modal";
import { Button } from "../Button";

import { DisplayedText } from "../../types/DisplayedTextType";
import { displayedTextAtom } from "../../atoms/displayedTextAtom";

import { AllStatus } from "../../types/AllStatusType";
import { statusAtom } from "../../atoms/statusAtom";
import {
    statusSelector,
    allStatusSelector,
} from "../../selectors/statusSelector";

import { GameProgress } from "../../types/GameProgressType";
import { gameProgressAtom } from "../../atoms/gameProgressAtom";
import { gameProgressSelector } from "../../selectors/gameProgressSelector";

import { Arm, whereToWear } from "../../types/ArmType";

import { createArm } from "../../services/createArm";

export const SelectFirstArms: FC = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);

    const setAllStatus: SetterOrUpdater<AllStatus> =
        useSetRecoilState(allStatusSelector);
    const allStatus = useRecoilValue(allStatusSelector);

    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);
    const gameProgress = useRecoilValue(gameProgressSelector);

    useEffect(() => {
        setDisplayedText({ texts: ["最初の装備を選択する"] });
    }, [setDisplayedText]);

    const [arms, setArms] = useState([
        {
            whereToWear: "body",
            wearEffect: [
                {
                    status: "hp",
                    effect: -1,
                },
            ],
        } as Arm,
    ]);

    type SelectFirstArmsProgressType = typeof whereToWear[number];

    const [selectFirstArmsProgress, setSelectFirstArmsProgress] = useState(
        "head" as SelectFirstArmsProgressType,
    );

    const createTwoArms = (
        luck: number,
        rare: number,
        specified: typeof whereToWear[number],
    ) => [createArm(luck, rare, specified), createArm(luck, rare, specified)];

    return (
        <div className="flex items-center justify-center">
            {createTwoArms(allStatus.luck, 1, selectFirstArmsProgress).map(
                (arm, i) => (
                    <Button
                        onClick={() => {
                            setArms(
                                arms[0].wearEffect[0].effect < 0
                                    ? [arm]
                                    : [...arms, arm],
                            );
                            selectFirstArmsProgress ===
                            whereToWear[whereToWear.length - 1]
                                ? (() => {
                                      setGameProgress("game_start");
                                      setAllStatus({ ...allStatus, arms });
                                  })()
                                : setSelectFirstArmsProgress(
                                      whereToWear[
                                          whereToWear.indexOf(
                                              selectFirstArmsProgress,
                                          ) + 1
                                      ],
                                  );
                        }}
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                    >
                        <p>where: {arm.whereToWear}</p>
                        <div>
                            <p>effect: </p>
                            {arm.wearEffect.map((effect) => (
                                <p key={effect.effect}>
                                    {`${effect.status}が${effect.effect}変化する`}
                                </p>
                            ))}
                        </div>
                    </Button>
                ),
            )}
        </div>
    );
};
