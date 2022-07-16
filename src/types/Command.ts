import { BaseStatus } from "./BaseStatus";

export type Command = {
    name: string;
    description?: string;
    effect: {
        affect: {
            referencedStatus: keyof BaseStatus | "";
            dice: number;
            sided: number;
        };
        beAffected: {
            referencedStatus: keyof BaseStatus | "";
            dice: number;
            sided: number;
            // otherEffect:"" TODO 状態異常回復等の特殊な奴も時間があれば作りたい
        };

        target: "user" | "enemy";
        hitRate: number;
        interval: number;
        effectText: string[];
    }[];
};
