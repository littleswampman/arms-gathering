import React, { FC } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Layout } from "../layout/Layout";

import { NameInput } from "../components/NameInput";
import { GameStart } from "../components/GameStart";

import { TextDisplay } from "../components/TextDisplay";

import { GameProgress } from "../types/GameProgress";
import { gameProgressAtom } from "../atoms/gameProgressAtom";
import { gameProgressSelector } from "../selectors/gameProgressSelector";

export const Start: FC = () => {
    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);
    const gameProgress = useRecoilValue(gameProgressSelector);
    const switchElement = () => {
        switch (gameProgress) {
            case "":
                return <GameStart />;
            case "start_name-input":
                return <NameInput />;
            default:
                return <p>Error!</p>;
        }
    };

    return (
        <Layout>
            <div className="relative h-full w-full">
                {switchElement()}
                <div className="absolute bottom-0 w-full">
                    <TextDisplay />
                </div>
            </div>
        </Layout>
    );
};
