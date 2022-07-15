import { selector, selectorFamily } from "recoil";
import { allStatusAtom } from "../atoms/allStatus";
import { AllStatus } from "../types/AllStatus";

export const allStatusSelector = selector<AllStatus>({
    key: "allStatusSelector",
    // getは{ get }を引数に取る関数
    get: ({ get }) => get(allStatusAtom),
});

// export const hpStatusSelector = selector<AllStatus["hp"]>({
//     key: "allStatusSelector",
//     // getは{ get }を引数に取る関数
//     get: ({ get }) => get(AllStatusAtom).hp,
//     set: ({set}, newValue) =>set(AllStatusAtom, ((prevState) => {...prevState, "hp": newValue})),
// });

export const statusSelector = selectorFamily({
    key: "statusSelector",
    get:
        (field: keyof AllStatus) =>
        ({ get }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            get(allStatusAtom)[field];
        },
});
