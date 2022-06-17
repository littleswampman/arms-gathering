import { baseStatusArray } from "./status";

export type command = {
    name: string;
    description?: string;
    effect: {
        affect: {
            referencedStatus: typeof baseStatusArray[number] | "";
            dice: number;
            sided: number;
        };
        beAffected: {
            referencedStatus: typeof baseStatusArray[number] | "";
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
