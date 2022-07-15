import React, { FC } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Layout } from "../layout/Layout";
import { NameInput } from "../components/NameInput";

import { DisplayedText } from "../types/DisplayedText";
import { displayedTextAtom } from "../atoms/displayedTextAtom";
import { TextDisplay } from "../components/TextDisplay";

import { GameProgress } from "../types/GameProgress";
import { gameProgressAtom } from "../atoms/gameProgressAtom";
import { gameProgressSelector } from "../selectors/gameProgressSelector";

export const Start: FC = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);

    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);
    const gameProgress = useRecoilValue(gameProgressSelector);

    setDisplayedText({
        texts: ["a迷aaa宮にa潜る"],
        // 半角文字と全角文字を混ぜても正しく表示されるかのテスト
    });

    return (
        <Layout>
            <div className="relative h-full w-full">
                <div>Start</div>
                <NameInput />
                <div className="absolute bottom-0 w-full">
                    <TextDisplay />
                </div>
            </div>
        </Layout>
    );
};
