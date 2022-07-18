import React, { FC, useEffect } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { GameProgress } from "../../types/GameProgressType";
import { gameProgressAtom } from "../../atoms/gameProgressAtom";

export const GameStart: FC = () => {
    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);

    useEffect(() => {
        setGameProgress("game_select-room");
    }, [setGameProgress]);

    return <div>GameStart</div>;
};
