import React, { FC } from "react";
import styles from "./text-display.module.scss";

type Props = {
    texts: string[];
};

export const TextDisplay: FC<Props> = ({ texts }) => {
    let startSecond = 0;
    return (
        <div
            className={
                styles["wrapper"] +
                " " +
                "rounded-md border-4 border-solid border-slate-100 p-4"
            }
        >
            {texts.map((text, index) => {
                let p_style_typewriter = {
                    "--length": text.length,
                    "animation-delay": startSecond + "s",
                } as React.CSSProperties;
                startSecond += 2 + 0.2;

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
