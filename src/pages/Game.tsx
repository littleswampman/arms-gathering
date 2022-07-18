import React, { FC, useEffect } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Layout } from "../layout/Layout";

import { GameStart } from "../components/game/GameStart";
import { SelectRoom } from "../components/game/SelectRoom";

import { GameProgress } from "../types/GameProgressType";
import { gameProgressAtom } from "../atoms/gameProgressAtom";
import { gameProgressSelector } from "../selectors/gameProgressSelector";

import { allStatusSelector } from "../selectors/allStatusSelector";
import { GameRoom } from "../components/game/GameRoom";

export const Game: FC = () => {
    const allStatus = useRecoilValue(allStatusSelector);
    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);
    const gameProgress = useRecoilValue(gameProgressSelector);

    const switchElement = () => {
        switch (gameProgress) {
            case "game_start":
                return <GameStart />;
            case "game_select-room":
                return <SelectRoom />;
            case "game_room":
                return <GameRoom />;
            case "game_change-floor":
                return <p>a</p>;
            default:
                return <p>Error!</p>;
        }
    };

    // NOTE 開発用のconsole.log
    useEffect(() => {
        console.log(allStatus);
    }, [allStatus]);

    return (
        <Layout>
            <div className="h-full w-full">{switchElement()}</div>
        </Layout>
    );
};
