import { atom } from "recoil";
import { Status } from "../types/StatusType";
import { AllStatus } from "../types/AllStatusType";
import { BaseStatus } from "../types/BaseStatusType";
import { StatusAilment } from "../types/StatusAilmentType";
import { ArmStatus } from "../types/ArmStatusType";

const defaultStatus: AllStatus = {
    character: { name: "", age: 0 },
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

const defaultArmStatus: ArmStatus = {
    hp: 0,
    str: 0,
    iq: 0,
    piety: 0,
    luck: 0,
    avoidance: 0,
    statusAilment: [],
};

export const statusAtom = atom<Status>({
    key: "StatusAtom", // 一意のキー
    default: {
        characterStatus: defaultStatus,
        armStatus: defaultArmStatus,
    }, // 初期値
});
