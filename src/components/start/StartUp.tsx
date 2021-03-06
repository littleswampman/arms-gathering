import React, { FC, useEffect } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Button } from "../Button";

import { DisplayedText } from "../../types/DisplayedTextType";
import { displayedTextAtom } from "../../atoms/displayedTextAtom";

import { GameProgress } from "../../types/GameProgressType";
import { gameProgressAtom } from "../../atoms/gameProgressAtom";
import { gameProgressSelector } from "../../selectors/gameProgressSelector";

export const StartUp: FC = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);

    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);
    const gameProgress = useRecoilValue(gameProgressSelector);

    useEffect(() => {
        setDisplayedText({ texts: [""] });
    }, [setDisplayedText]);

    const changeGameProgressToStartNameInput = () => {
        setGameProgress("start_name-input");
    };

    return (
        <div className="flex flex-col">
            <p>arms gathering</p>
            <Button onClick={changeGameProgressToStartNameInput}>
                Game Start!!
            </Button>
        </div>
    );
};
