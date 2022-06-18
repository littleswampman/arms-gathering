import React, { FC } from "react";
import { useRecoilValue } from "recoil";

import { displayedTextState } from "../atoms/displayedTextState";
import styles from "./text-display.module.scss";

export const TextDisplay: FC = () => {
    let textStartSecond = 0;
    let lineStartSecond = 0;
    const splitArray = (arr: string[], n: number) => {
        // 配列arrをn個の要素ごとに分割する関数
        const repeat = Math.ceil(arr.length / n);
        return new Array(repeat)
            .fill(0)
            .map((_: 0, i: number) => arr.slice(i * n, (i + 1) * n));
    };
    // const sliceByNumber = (array, number) => {
    //     const length = Math.ceil(array.length / number)
    //     return new Array(length).fill().map((_, i) =>
    //       array.slice(i * number, (i + 1) * number)
    //     )
    //   }
    const lines = 3; // 一度に表示する最大行数
    const texts = splitArray(useRecoilValue(displayedTextState).texts, lines); // lines行ごとに分割されている
    console.log(texts);

    return (
        <div
            className={
                styles["wrapper"] +
                " " +
                "relative rounded-md border-4 border-solid border-slate-100 p-4"
            }
        >
            {texts.map((line, i, array) => {
                let lineTextLength = line
                    .map((text) => text.length)
                    .reduce((sum, len) => sum + len, 0);
                // 表示する行に含まれる文字数
                let lineLength = line.length;
                // 表示する行数
                let div_style_typewriterWrapper = {
                    "--line-text-length": lineTextLength,
                    "--line-length": lineLength,
                    "animation-delay": lineStartSecond + "s",
                    "animation-fill-mode":
                        array.length === i + 1 ? "forwards" : "none",
                } as React.CSSProperties;
                textStartSecond = lineStartSecond;

                lineStartSecond += (lineTextLength + lineLength) * 0.2 + 0.2;
                return (
                    <div
                        style={div_style_typewriterWrapper}
                        className={styles["type-writer_wrapper"]}
                    >
                        {line.map((text) => {
                            let textLength = text.length;
                            let p_style_typewriter = {
                                "--text-length": textLength,
                                "animation-delay": textStartSecond + "s",
                            } as React.CSSProperties;
                            textStartSecond += textLength * 0.2 + 0.2;

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
            })}
        </div>
    );
};
