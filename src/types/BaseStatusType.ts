export type BaseStatus = {
    hp: number; // 生命力 おぞましい程の傷を受けても立ち上がる生命力は、怪物と冒険者の分かり易い共通項だろう
    // level: number; // 経験 死地を生き抜いてこそ得られるものもあるのかもしれない
    str: number; // 力 膂力のある持ち主にこそ、武器はその力を貸すのだ
    iq: number; // 知恵 冒険者が尊ぶ思考は、そうでないものにとっては狂気でしかない
    piety: number; // 信仰心 心の中で緻密に作り上げられた"神"は、心の外にも力を及ぼし始める
    luck: number; // 幸運 死の臭いを嗅ぎ分ける力であり、残念ながらポーカーは強くならない
    avoidance: number; // 回避 結局のところ、どんな鋭い攻撃も当たらなければ意味はないのである
};

export const baseStatusArray = [
    "hp", // 生命力 おぞましい程の傷を受けても立ち上がる生命力は、怪物と冒険者の分かり易い共通項だろう
    // "level", // 経験 死地を生き抜いてこそ得られるものもあるのかもしれない
    "str", // 力 膂力のある持ち主にこそ、武器はその力を貸すのだ
    "iq", // 知恵 冒険者が尊ぶ思考は、そうでないものにとっては狂気でしかない
    "piety", // 信仰心 心の中で緻密に作り上げられた"神"は、心の外にも力を及ぼし始める
    "luck", // 幸運 死の臭いを嗅ぎ分ける力であり、残念ながらポーカーは強くならない
    "avoidance", // 回避 結局のところ、どんな鋭い攻撃も当たらなければ意味はないのである
] as (keyof BaseStatus)[];

export const baseStatusObject: BaseStatus = {
    hp: 0,
    str: 0,
    iq: 0,
    piety: 0,
    luck: 0,
    avoidance: 0,
};
