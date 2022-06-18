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
