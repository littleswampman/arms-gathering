import React, { FC } from "react";
import { useSetRecoilState, SetterOrUpdater } from "recoil";

import { Layout } from "../layout/Layout";
import { DisplayedText } from "../types/DisplayedTextType";
import { displayedTextAtom } from "../atoms/displayedTextAtom";

export const Playing: FC = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);
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
            <div>Playing</div>
        </Layout>
    );
};
