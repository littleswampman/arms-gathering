import { BaseStatus } from "./baseStatus";
import { Arm } from "./arm";
import { statusAilment } from "./statusAilment";
import { character } from "./character";

export type AllStatus = {
    character: character;
    hp: BaseStatus["hp"];
    level: BaseStatus["level"];
    str: BaseStatus["str"];
    iq: BaseStatus["iq"];
    piety: BaseStatus["piety"];
    luck: BaseStatus["luck"];
    avoidance: BaseStatus["avoidance"];
    statusAilment: [statusAilment] | [];
    arms: Arm[];
};
