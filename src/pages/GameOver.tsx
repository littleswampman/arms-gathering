import React, { FC } from "react";
import { useSetRecoilState, SetterOrUpdater } from "recoil";

import { Layout } from "../layout/Layout";
import { displayedText } from "../types/displayedText";
import { displayedTextState } from "../atoms/displayedTextState";
import { TextDisplay } from "../components/TextDisplay";

export const GameOver: FC = () => {
    const setDisplayedText: SetterOrUpdater<displayedText> =
        useSetRecoilState(displayedTextState);
    setDisplayedText({
        texts: ["あなたは死んだ"],
    });
    return (
        <Layout>
            <div>GameOver</div>
            <div className="relative h-full w-full">
                <div className="absolute bottom-0 w-full">
                    <TextDisplay />
                </div>
            </div>
        </Layout>
    );
};
