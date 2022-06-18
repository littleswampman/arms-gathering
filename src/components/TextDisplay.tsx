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
    const lines = 3; // 一度に表示する最大行数
    const rows = 13; // 一行に表示する最大文字数
    const texts = splitArray(
        (() => {
            let val = useRecoilValue(displayedTextState).texts;
            while (val.some((el) => el.length > rows)) {
                const temp = val;
                val = [];
                temp.map((text) =>
                    text.length <= rows
                        ? val.push(text)
                        : val.push(text.slice(0, rows), text.slice(rows)),
                );
            }
            return val;
        })(),
        lines,
    ); // 最大rows文字のlines行ごとに分割されている

    return (
        <div
            className={
                styles["wrapper"] +
                " " +
                "relative rounded-md border-4 border-solid border-slate-100 p-2 md:p-4 lg:p-6"
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
