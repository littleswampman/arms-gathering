import React, { FC, useState, useEffect } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Dialog } from "@headlessui/react";

import { Modal } from "../../Modal";
import { Button } from "../../Button";

import { DisplayedText } from "../../../types/DisplayedTextType";
import { displayedTextAtom } from "../../../atoms/displayedTextAtom";

import { AllStatus } from "../../../types/AllStatusType";
import { statusAtom } from "../../../atoms/statusAtom";
import { allStatusSelector } from "../../../selectors/statusSelector";

import { GameProgress } from "../../../types/GameProgressType";
import { gameProgressAtom } from "../../../atoms/gameProgressAtom";
import { gameProgressSelector } from "../../../selectors/gameProgressSelector";

import { Room } from "../../../types/RoomType";
import { roomAtom } from "../../../atoms/roomAtom";
import { roomSelector } from "../../../selectors/roomSelector";
import {
    BaseStatus,
    baseStatusArray,
    baseStatusObject,
} from "../../../types/BaseStatusType";
import { updateStatusNumByEffects } from "../../../services/updateStatusNumByEffects";
import { createArm } from "../../../services/createArm";
import { Arm } from "../../../types/ArmType";
import { updateStatusNumByArm } from "../../../services/updateStatusNumByArms";

export const TreasureChest: FC = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);

    const setAllStatus: SetterOrUpdater<AllStatus> =
        useSetRecoilState(allStatusSelector);
    const allStatus = useRecoilValue(allStatusSelector);

    const status = useRecoilValue(statusAtom);

    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);

    const [buttonIsView, setButtonIsView] = useState(true);

    type StatueProgress = {
        progress: "open-or-not" | "select-arm" | "result";
        arm?: Arm;
    };
    const [progress, setProgress] = useState({
        progress: "open-or-not",
    } as StatueProgress);

    useEffect(() => {
        const texts = () => {
            switch (progress.progress) {
                case "open-or-not":
                    return ["宝箱を見つけた！", "開けますか？"];
                case "select-arm": {
                    const where = progress.arm?.whereToWear ?? "";

                    return [
                        `${where}の装備が見つかった！`,
                        "現在の装備と交換しますか？",
                    ];
                }
                case "result":
                    return [];
                default:
                    // eslint-disable-next-line no-case-declarations
                    const check: never = progress.progress;

                    return check;
            }
        };
        setTimeout(() => {
            setDisplayedText({ texts: texts() });
        }, 10);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress.progress, progress.arm, setDisplayedText]);

    useEffect(() => {
        if (progress.arm !== undefined) {
            updateStatusNumByArm([progress.arm], setAllStatus, allStatus);
            const updatedArms = [
                ...allStatus.arms.filter(
                    (arm) => arm.whereToWear !== progress.arm?.whereToWear,
                ),
                progress.arm,
            ];

            setAllStatus({ ...allStatus, arms: updatedArms });
            setTimeout(() => {
                setGameProgress("game_select-room");
            }, 2000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress.arm, setAllStatus, setGameProgress]);

    const switchElement = () => {
        switch (progress.progress) {
            case "open-or-not":
                return (
                    <>
                        <Button
                            onClick={() => {
                                setProgress({
                                    progress: "select-arm",
                                });
                            }}
                        >
                            開ける
                        </Button>
                        <Button
                            onClick={() => {
                                setTimeout(() => {
                                    setGameProgress("game_select-room");
                                }, 2000);
                            }}
                        >
                            開けない
                        </Button>
                    </>
                );
            case "select-arm": {
                const rare = 0;
                const newArm = createArm(allStatus.luck, rare);
                const where = newArm.whereToWear;
                const currentArm = allStatus.arms.filter(
                    (arm) => where === arm.whereToWear,
                )[0];

                return (
                    <>
                        <Button
                            onClick={() => {
                                setButtonIsView(false);
                                setProgress({
                                    progress: "result",
                                    arm: currentArm,
                                });
                            }}
                        >
                            <p>current</p>
                            <p>where: {currentArm.whereToWear}</p>
                            <p>effect: </p>
                            {currentArm.wearEffect.map((effect) => (
                                <p key={effect.effect}>
                                    {`${effect.status}が${effect.effect}変化する`}
                                </p>
                            ))}
                        </Button>
                        <Button
                            onClick={() => {
                                setButtonIsView(false);
                                setProgress({
                                    progress: "result",
                                    arm: newArm,
                                });
                            }}
                        >
                            <p>new</p>
                            <p>where: {newArm.whereToWear}</p>
                            <p>effect: </p>
                            {newArm.wearEffect.map((effect) => (
                                <p key={effect.effect}>
                                    {`${effect.status}が${effect.effect}変化する`}
                                </p>
                            ))}
                        </Button>
                    </>
                );
            }

            default:
                return <p />;
        }
    };

    return <div className="flex">{buttonIsView && switchElement()}</div>;
};
