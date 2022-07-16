import { atom } from "recoil";
import { AllStatus } from "../types/AllStatusType";

const defaultAllStatus: AllStatus = {
    character: {
        name: "",
        age: 0,
    },
    hp: 10,
    maxHp: 10,
    level: 1,
    str: 10,
    iq: 10,
    piety: 10,
    luck: 10,
    avoidance: 10,
    statusAilment: [],
    arms: [],
};

export const allStatusAtom = atom<AllStatus>({
    key: "AllStatusAtom", // 一意のキー
    default: defaultAllStatus, // 初期値
});
