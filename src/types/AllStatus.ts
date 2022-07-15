import { BaseStatus } from "./BaseStatus";
import { Arm } from "./Arm";
import { StatusAilment } from "./StatusAilment";
import { Character } from "./Character";

export type AllStatus = {
    character: Character;
    hp: BaseStatus["hp"];
    level: BaseStatus["level"];
    str: BaseStatus["str"];
    iq: BaseStatus["iq"];
    piety: BaseStatus["piety"];
    luck: BaseStatus["luck"];
    avoidance: BaseStatus["avoidance"];
    statusAilment: [StatusAilment] | [];
    arms: Arm[];
};
