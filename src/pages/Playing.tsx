import React, { FC } from "react";
import { useRecoilValue, useSetRecoilState, SetterOrUpdater } from "recoil";

import { Layout } from "../layout/Layout";
import { displayedText } from "../types/displayedText";
import { displayedTextState } from "../atoms/displayedTextState";
import { TextDisplay } from "../components/TextDisplay";

export const Playing: FC = () => {
    const setDisplayedText: SetterOrUpdater<displayedText> =
        useSetRecoilState(displayedTextState);
    setDisplayedText({
        texts: ["てきがあらわれた！！", "ぶきをもて！！", "たちむかうんだ！！"],
    });

    return (
        <Layout>
            <div>Playing</div>
            <TextDisplay />
        </Layout>
    );
};
