import React, { FC } from "react";
import { useRecoilValue } from "recoil";

import { displayedTextState } from "../atoms/displayedTextState";
import styles from "./text-display.module.scss";

export const TextDisplay: FC = () => {
    let startSecond = 0;
    const texts = useRecoilValue(displayedTextState).texts;
    return (
        <div
            className={
                styles["wrapper"] +
                " " +
                "rounded-md border-4 border-solid border-slate-100 p-4"
            }
        >
            {texts.map((text) => {
                let textLength = text.length;
                let p_style_typewriter = {
                    "--length": textLength,
                    "animation-delay": startSecond + "s",
                } as React.CSSProperties;
                startSecond += textLength * 0.2 + 0.2;

                return (
                    <p
                        style={p_style_typewriter}
                        className={styles["type-writer"]}
                    >
                        {text}
                    </p>
                );
            })}
        </div>
    );
};
