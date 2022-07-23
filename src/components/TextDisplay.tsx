import React, { FC, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { processedDisplayedTextSelector } from "../selectors/displayedTextSelector";
import styles from "./text-display.module.scss";

// const timer = (() => {
//     // CSSアニメーションの発火タイミングを調整する為のタイマー
//     // timer()で値を取得する
//     let delay = 0;
//     setInterval(() => {
//         delay += 0.1;
//     }, 100);

//     return () => delay;
// })();

export const TextDisplay: FC = () => {
    // const time = useRef(timer());
    let textStartSecond = 0;
    let lineStartSecond = 0;
    const texts = useRecoilValue(processedDisplayedTextSelector);
    // useEffect(() => {
    //     // NOTE ESLintを無理やり黙らせているけれど、なんとかならないものか
    //     time.current = Math.round(timer());

    // }, [texts]);

    // 既に1行、1画面に表示する文字ごとに区切る処理をしてある文字列

    const textElements = (allTexts: string[][]) =>
        allTexts.map((line, i, array) => {
            const lineTextLength = line
                .map((text) => text.length)
                .reduce((sum, len) => sum + len, 0);
            // 表示する行に含まれる文字数
            const lineLength = line.length;
            // 表示する行数
            const divStyleTypewriterWrapper = {
                "--line-text-length": lineTextLength,
                "--line-length": lineLength,
                "animationDelay": `${lineStartSecond}s`,
                "animationFillMode":
                    array.length === i + 1 ? "forwards" : "none",
            } as React.CSSProperties;
            textStartSecond = lineStartSecond;

            lineStartSecond += (lineTextLength + lineLength) * 0.2 + 0.2;

            return (
                // TODO まぁまぁ複雑になったので後で整理する
                <div
                    style={divStyleTypewriterWrapper}
                    className={styles["type-writer_wrapper"]}
                    key={line[i]}
                >
                    {line.map((text) => {
                        const textLength = text.length;
                        const pStyleTypewriter = {
                            "--text-length": textLength,
                            "animationDelay": `${textStartSecond}s`,
                        } as React.CSSProperties;
                        textStartSecond += textLength * 0.2 + 0.2;

                        return (
                            <p
                                style={pStyleTypewriter}
                                className={styles["type-writer"]}
                                key={text}
                            >
                                {(() =>
                                    [...Array(textLength).keys()]
                                        .slice()
                                        .map((j) =>
                                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                            text[j].match(/[ -~]/) ? (
                                                <span
                                                    className={
                                                        styles[
                                                            "hankaku-to-zenkaku"
                                                        ]
                                                    }
                                                    key={j}
                                                >
                                                    {text[j]}
                                                </span>
                                            ) : (
                                                <span key={j}>{text[j]}</span>
                                            ),
                                        ))().map((el) => el)}
                            </p>
                        );
                    })}
                </div>
            );
        });

    return (
        <div
            className={
                `${styles.wrapper} ` +
                `relative rounded-md border-4 border-solid border-slate-100 p-2 md:p-4 lg:p-6`
            }
        >
            {textElements(texts)}
        </div>
    );
};
