import React, { FC } from "react";
import { useSetRecoilState, SetterOrUpdater } from "recoil";

import { Layout } from "../layout/Layout";
import { DisplayedText } from "../types/DisplayedText";
import { displayedTextAtom } from "../atoms/displayedTextAtom";
import { TextDisplay } from "../components/TextDisplay";

export const Battle: FC = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);
    setDisplayedText({
        texts: ["たたかい"],
    });

    return (
        <Layout>
            <div>Battle</div>
            <div className="relative h-full w-full">
                <div className="absolute bottom-0 w-full">
                    <TextDisplay />
                </div>
            </div>
        </Layout>
    );
};
