import React, { FC, useEffect } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { AllStatus } from "../../types/AllStatusType";
import { allStatusAtom } from "../../atoms/allStatusAtom";
import { allStatusSelector } from "../../selectors/allStatusSelector";

import { GameProgress } from "../../types/GameProgressType";
import { gameProgressAtom } from "../../atoms/gameProgressAtom";
import { gameProgressSelector } from "../../selectors/gameProgressSelector";

import { updateStatusNumByArm } from "../../services/updateStatusNumByArms";

export const GameStart: FC = () => {
    const setAllStatus: SetterOrUpdater<AllStatus> =
        useSetRecoilState(allStatusAtom);
    const allStatus = useRecoilValue(allStatusSelector);

    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);

    useEffect(() => {
        updateStatusNumByArm(allStatus.arms, setAllStatus, allStatus);
        setGameProgress("game_select-room");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setAllStatus, setGameProgress]);

    return <div>GameStart</div>;
};
