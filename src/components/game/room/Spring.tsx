import React, { FC, useState, useEffect } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Dialog } from "@headlessui/react";

import { Modal } from "../../Modal";
import { Button } from "../../Button";

import { DisplayedText } from "../../../types/DisplayedTextType";
import { displayedTextAtom } from "../../../atoms/displayedTextAtom";

import { AllStatus } from "../../../types/AllStatusType";
import { allStatusAtom } from "../../../atoms/allStatusAtom";
import { allStatusSelector } from "../../../selectors/allStatusSelector";

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

export const Spring = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);

    const setAllStatus: SetterOrUpdater<AllStatus> =
        useSetRecoilState(allStatusAtom);
    const allStatus = useRecoilValue(allStatusSelector);

    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);

    type SpringProgress = {
        progress: "drink-or-not" | "result";
        result?: { status: string; effect: number };
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
        setDisplayedText({ texts });
    }, [progress.progress, progress.result, setDisplayedText]);

    return (
        <div className="flex">
            <Button
                onClick={() => {
                    const status =
                        baseStatusArray[
                            Math.floor(Math.random() * baseStatusArray.length)
                        ];
                    const effect = Math.ceil(Math.random() * 10);
                    setProgress({
                        progress: "result",
                        result: { status, effect },
                    });
                    const updatedAllStatus: AllStatus =
                        progress.result?.status !== undefined
                            ? {
                                  ...allStatus,
                                  [progress.result?.status]:
                                      progress.result?.effect,
                              }
                            : allStatus;
                    setAllStatus(updatedAllStatus);

                    setTimeout(() => {
                        setGameProgress("game_select-room");
                    }, 10000);
                }}
            >
                飲む
            </Button>
            <Button
                onClick={() => {
                    setTimeout(() => {
                        setGameProgress("game_select-room");
                    }, 5000);
                }}
            >
                飲まない
            </Button>
        </div>
    );
};
