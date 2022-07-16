import { BaseStatus } from "./BaseStatusType";
import { Arm } from "./ArmType";
import { StatusAilment } from "./StatusAilmentType";
import { Character } from "./CharacterType";

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
