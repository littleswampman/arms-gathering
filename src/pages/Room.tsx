import React, { FC } from "react";
import { useSetRecoilState, SetterOrUpdater } from "recoil";

import { Layout } from "../layout/Layout";
import { DisplayedText } from "../types/DisplayedTextType";
import { displayedTextAtom } from "../atoms/displayedTextAtom";

export const Room: FC = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);
    setDisplayedText({
        texts: ["たたかい"],
    });

    return (
        <Layout>
            <div>Battle</div>
        </Layout>
    );
};
