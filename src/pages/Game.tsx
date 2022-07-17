import React, { FC } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Layout } from "../layout/Layout";

import { GameStart } from "../components/game/GameStart";

import { GameProgress } from "../types/GameProgressType";
import { gameProgressAtom } from "../atoms/gameProgressAtom";
import { gameProgressSelector } from "../selectors/gameProgressSelector";

export const Game: FC = () => {
    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);
    const gameProgress = useRecoilValue(gameProgressSelector);

    const switchElement = () => {
        switch (gameProgress) {
            case "game_start":
                return <GameStart />;
            case "game_select-room":
                return <p>a</p>;
            case "game_room":
                return <p>a</p>;
            case "game_change-floor":
                return <p>a</p>;
            default:
                return <p>Error!</p>;
        }
    };

    return (
        <Layout>
            <div className="h-full w-full">{switchElement()}</div>
        </Layout>
    );
};
