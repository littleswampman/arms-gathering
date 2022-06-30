import { selector } from "recoil";
import { displayedTextAtom } from "../atoms/displayedTextAtom";
import { displayedText } from "../types/displayedText";

export const displayedTextSelector = selector<displayedText>({
    key: "displayedTextSelector",
    // getは{ get }を引数に取る関数
    get: ({ get }) => {
        return get(displayedTextAtom);
    },
});

export const processedDisplayedTextSelector = selector<string[][]>({
    key: "processedDisplayedTextSelector",
    // getは{ get }を引数に取る関数
    get: ({ get }) => {
        const lines = 3; // 一度に表示する最大行数
        const rows = 13; // 一行に表示する最大文字数
        const splitArray = (textArray: string[], n: number) => {
            // 配列textArrayをn個の要素ごとに分割する関数
            const repeat = Math.ceil(textArray.length / n);
            return new Array(repeat)
                .fill(0)
                .map((_: 0, i: number) => textArray.slice(i * n, (i + 1) * n));
        };
        const limitedArray = (textArray: string[], limit: number) => {
            // 配列textArrayの要素における文字数を最大limitになるよう分割する関数
            // TODO 高速化の余地あり
            while (textArray.some((el) => el.length > limit)) {
                const temp = textArray;
                textArray = [];
                temp.map((text) =>
                    text.length <= limit
                        ? textArray.push(text)
                        : textArray.push(
                              text.slice(0, limit),
                              text.slice(limit),
                          ),
                );
            }
            return textArray;
        };
        const texts = splitArray(
            limitedArray(get(displayedTextAtom).texts, rows),
            lines,
        );
        return texts; // 最大rows文字のlines行ごとに分割されている
    },
});
