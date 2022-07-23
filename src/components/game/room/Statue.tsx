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

export const Statue = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);

    const setAllStatus: SetterOrUpdater<AllStatus> =
        useSetRecoilState(allStatusSelector);
    const allStatus = useRecoilValue(allStatusSelector);

    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);

    const [buttonIsView, setButtonIsView] = useState(true);

    type StatueProgress = {
        progress: "pray-or-not" | "result";
        result?: { status: keyof BaseStatus; effect: number };
    };
    const [progress, setProgress] = useState({
        progress: "pray-or-not",
    } as StatueProgress);

    const kindOfStatue: [...[string, string][]] = [
        ["女神", "悲しくなるほどに神々しい"],
        ["英雄らしき者", "名も知らないものにすがりつくのもいいかもしれない"],
        ["禍々しいなにか", "少し気分がわるくなった"],
    ];

    useEffect(() => {
        const statueNum = Math.floor(Math.random() * kindOfStatue.length);
        const texts =
            progress.progress !== "pray-or-not" && !!progress.result
                ? [
                      `${progress.result.status}が${progress.result.effect}変化した！`,
                  ]
                : [
                      `${kindOfStatue[statueNum][0]}の石像がある`,
                      "祀られているのだろうか",
                      kindOfStatue[statueNum][1],
                      "祈りますか？",
                  ];
        setTimeout(() => {
            setDisplayedText({ texts });
        }, 10);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        祈る
                    </Button>
                    <Button
                        onClick={() => {
                            setButtonIsView(false);
                            setTimeout(() => {
                                setGameProgress("game_select-room");
                            }, 2000);
                        }}
                    >
                        祈らない
                    </Button>
                </>
            )}
        </div>
    );
};
