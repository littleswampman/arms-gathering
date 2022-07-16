import React, { FC } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Layout } from "../layout/Layout";

import { CharacterCreate } from "../components/start/CharacterCreate";
import { GameStart } from "../components/start/GameStart";
import { SelectFirstArms } from "../components/start/SelectFirstArms";

import { GameProgress } from "../types/GameProgressType";
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
                return <CharacterCreate />;
            case "start_select-arms":
                return <SelectFirstArms />;
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
