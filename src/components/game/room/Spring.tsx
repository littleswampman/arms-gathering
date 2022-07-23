import React, { FC, useState, useEffect } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Dialog } from "@headlessui/react";

import { Modal } from "../../Modal";
import { Button } from "../../Button";

import { DisplayedText } from "../../../types/DisplayedTextType";
import { displayedTextAtom } from "../../../atoms/displayedTextAtom";

import { AllStatus } from "../../../types/AllStatusType";
import { statusAtom } from "../../../atoms/statusAtom";
import { statusSelector } from "../../../selectors/statusSelector";
import { allStatusSelector } from "../../../selectors/statusSelector";

import { Status } from "../../../types/StatusType";

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

export const Spring = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);

    const setAllStatus: SetterOrUpdater<AllStatus> =
        useSetRecoilState(allStatusSelector);
    const allStatus = useRecoilValue(allStatusSelector);

    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);

    const [buttonIsView, setButtonIsView] = useState(true);

    type SpringProgress = {
        progress: "drink-or-not" | "result";
        result?: { status: keyof BaseStatus; effect: number };
    };
    const [progress, setProgress] = useState({
        progress: "drink-or-not",
    } as SpringProgress);

    useEffect(() => {
        const texts =
            progress.progress !== "drink-or-not" && !!progress.result
                ? [
                      `${progress.result.status}が${progress.result.effect}変化した！`,
                  ]
                : ["水の湧き出ている泉がある", "飲みますか？"];
        setTimeout(() => {
            setDisplayedText({ texts });
        }, 10);
    }, [progress.progress, progress.result, setDisplayedText]);

    useEffect(() => {
        if (progress.result !== undefined) {
            updateStatusNumByEffects(
                [progress.result],
                setAllStatus,
                allStatus,
            );
            setTimeout(() => {
                setGameProgress("game_select-room");
            }, 5000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress.result, setAllStatus, setGameProgress]);

    return (
        <div className="flex">
            {buttonIsView && (
                <>
                    <Button
                        onClick={() => {
                            setButtonIsView(false);
                            const status =
                                baseStatusArray[
                                    Math.floor(
                                        Math.random() * baseStatusArray.length,
                                    )
                                ];
                            const effect = Math.ceil(
                                allStatus.luck -
                                    Math.random() * (allStatus.luck * 1.6),
                            );
                            setProgress({
                                progress: "result",
                                result: { status, effect },
                            });
                        }}
                    >
                        飲む
                    </Button>
                    <Button
                        onClick={() => {
                            setButtonIsView(false);
                            setTimeout(() => {
                                setGameProgress("game_select-room");
                            }, 5000);
                        }}
                    >
                        飲まない
                    </Button>
                </>
            )}
        </div>
    );
};
