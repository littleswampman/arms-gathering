import React, { FC } from "react";
import { useRecoilValue } from "recoil";

import { processedDisplayedTextSelector } from "../selectors/displayedTextSelector";
import styles from "./text-display.module.scss";

export const TextDisplay: FC = () => {
    let textStartSecond = 0;
    let lineStartSecond = 0;
    const texts = useRecoilValue(processedDisplayedTextSelector);

    return (
        // TODO まぁまぁ複雑になったので後で整理する
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
                                    {(() => {
                                        let temp: JSX.Element[] = [];
                                        for (let i = 0; i < textLength; i++) {
                                            text[i].match(/[ -~]/)
                                                ? temp.push(
                                                      <span
                                                          className={
                                                              styles[
                                                                  "hankaku-to-zenkaku"
                                                              ]
                                                          }
                                                      >
                                                          {text[i]}
                                                      </span>,
                                                  )
                                                : temp.push(
                                                      <span>{text[i]}</span>,
                                                  );
                                        }
                                        return temp;
                                    })().map((el) => el)}
                                </p>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
