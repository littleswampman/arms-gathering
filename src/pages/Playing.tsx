import React, { FC } from "react";
import { useSetRecoilState, SetterOrUpdater } from "recoil";

import { Layout } from "../layout/Layout";
import { displayedText } from "../types/displayedText";
import { displayedTextState } from "../atoms/displayedTextState";
import { TextDisplay } from "../components/TextDisplay";

export const Playing: FC = () => {
    const setDisplayedText: SetterOrUpdater<displayedText> =
        useSetRecoilState(displayedTextState);
    setDisplayedText({
        texts: [
            "てきがあらわれた！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！",
            "ぶきをもて！！",
            "たちむかうんだ！！",
            "まだあるのか！！",
            "おかわりもいいぞ！",
            "もうちっとだけ続くんじゃ",
            "俺たちの戦いはこれからだ！",
        ],
    });

    return (
        <Layout>
            <div className="relative h-full w-full">
                <div className="absolute bottom-0 w-full">
                    <TextDisplay />
                </div>
            </div>
        </Layout>
    );
};
