import { selector, selectorFamily } from "recoil";
import { statusAtom } from "../atoms/statusAtom";
import { AllStatus } from "../types/AllStatusType";
import { Status } from "../types/StatusType";

export const statusSelector = selector<Status>({
    key: "statusSelector",
    // getは{ get }を引数に取る関数
    get: ({ get }) => get(statusAtom),
    set: ({ set }, newStatus) => {
        set(statusAtom, newStatus);
    },
});

export const allStatusSelector = selector<AllStatus>({
    key: "allStatusSelector",
    // getは{ get }を引数に取る関数
    get: ({ get }) => get(statusAtom).characterStatus,
    set: ({ set, get }, s) => {
        const newAllStatus = s as unknown as AllStatus;
        const status = get(statusAtom);
        const updatedStatus = {
            ...status,
            characterStatus: newAllStatus,
        } as Status;

        set(statusAtom, updatedStatus);
    },
});

// export const hpStatusSelector = selector<Status["hp"]>({
//     key: "statusSelector",
//     // getは{ get }を引数に取る関数
//     get: ({ get }) => get(StatusAtom).hp,
//     set: ({set}, newValue) =>set(StatusAtom, ((prevState) => {...prevState, "hp": newValue})),
// });

// export const statusSelector = selectorFamily({
//     key: "statusSelector",
//     get:
//         (field: keyof Status) =>
//         ({ get }) => {
//             // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//             get(statusAtom)[field];
//         },
// });
