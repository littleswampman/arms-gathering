import React, { FC } from "react";
import { useRecoilValue } from "recoil";

import { processedDisplayedTextSelector } from "../selectors/displayedTextSelector";
import styles from "./text-display.module.scss";

const timer = (() => {
    // CSSアニメーションの発火タイミングを調整する為のタイマー
    // timer()で値を取得する
    let delay = 0;
    setInterval(() => {
        delay += 0.1;
    }, 100);

    return () => delay;
})();

export const TextDisplay: FC = () => {
    let textStartSecond = timer() - 0.4;
    let lineStartSecond = timer() - 0.4;
    const texts = useRecoilValue(processedDisplayedTextSelector);
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
                "animation-delay": `${lineStartSecond}s`,
                "animation-fill-mode":
                    array.length === i + 1 ? "forwards" : "none",
            } as React.CSSProperties;
            textStartSecond = lineStartSecond;

            lineStartSecond += (lineTextLength + lineLength) * 0.2 + 0.2;

            return (
                // TODO まぁまぁ複雑になったので後で整理する
                <div
                    style={divStyleTypewriterWrapper}
                    className={styles["type-writer_wrapper"]}
                >
                    {line.map((text) => {
                        const textLength = text.length;
                        const pStyleTypewriter = {
                            "--text-length": textLength,
                            "animation-delay": `${textStartSecond}s`,
                        } as React.CSSProperties;
                        textStartSecond += textLength * 0.2 + 0.2;

                        return (
                            <p
                                style={pStyleTypewriter}
                                className={styles["type-writer"]}
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
                                                >
                                                    {text[j]}
                                                </span>
                                            ) : (
                                                <span>{text[j]}</span>
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
