import React, { FC } from "react";
import { useSetRecoilState, SetterOrUpdater } from "recoil";

import { Layout } from "../layout/Layout";
import { displayedText } from "../types/displayedText";
import { displayedTextState } from "../atoms/displayedTextState";
import { TextDisplay } from "../components/TextDisplay";

export const Start: FC = () => {
    const setDisplayedText: SetterOrUpdater<displayedText> =
        useSetRecoilState(displayedTextState);
    setDisplayedText({
        texts: ["迷宮に潜る"],
    });
    return (
        <Layout>
            <div>Start</div>
            <div className="relative h-full w-full">
                <div className="absolute bottom-0 w-full">
                    <TextDisplay />
                </div>
            </div>
        </Layout>
    );
};
