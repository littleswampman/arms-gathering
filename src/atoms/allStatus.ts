import { atom } from "recoil";
import { AllStatus } from "../types/allStatus";

const defaultAllStatus: AllStatus = {
    character: {
        name: "",
        age: 0,
    },
    hp: 0,
    level: 0,
    str: 0,
    iq: 0,
    piety: 0,
    luck: 0,
    avoidance: 0,
    statusAilment: [],
    arms: [],
};

export const allStatusAtom = atom<AllStatus>({
    key: "AllStatusAtom", // 一意のキー
    default: defaultAllStatus, // 初期値
});
