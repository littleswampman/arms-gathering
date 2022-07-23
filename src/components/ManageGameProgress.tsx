import React, { FC, useEffect } from "react";

import { useRecoilValue, SetterOrUpdater, useSetRecoilState } from "recoil";

import { Room } from "../pages/Room";
import { GameOver } from "../pages/GameOver";
import { Game } from "../pages/Game";
import { Start } from "../pages/Start";

import { GameProgress } from "../types/GameProgressType";
import { gameProgressAtom } from "../atoms/gameProgressAtom";
import { gameProgressSelector } from "../selectors/gameProgressSelector";

import { AllStatus } from "../types/AllStatusType";
import { statusAtom } from "../atoms/statusAtom";
import { statusSelector, allStatusSelector } from "../selectors/statusSelector";

import { updateStatusNumByArm } from "../services/updateStatusNumByArms";

export const ManageGameProgress: FC = () => {
    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);

    useEffect(() => {
        setGameProgress("");
    }, [setGameProgress]);

    const setAllStatus: SetterOrUpdater<AllStatus> =
        useSetRecoilState(allStatusSelector);
    const allStatus = useRecoilValue(allStatusSelector);

    useEffect(() => {
        updateStatusNumByArm(allStatus.arms, setAllStatus, allStatus);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setAllStatus, allStatus.arms, setGameProgress]);

    const gameProgress = useRecoilValue(gameProgressSelector);
    const switchElement = (gameProg: string) => {
        switch (true) {
            case /start_.*/.test(gameProg):
                return <Start />;
            case /game_.*/.test(gameProg):
                return <Game />;
            case /room.*/.test(gameProg):
                return <Room />;
            case /game-over_.*/.test(gameProg):
                return <GameOver />;
            case /game-clear.*/.test(gameProg):
                return <p>error!! game-clear is not defined</p>;
            default:
                return <Start />;
        }
    };

    return <>{switchElement(gameProgress)}</>;
};
