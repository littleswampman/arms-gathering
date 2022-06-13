import React, { FC } from "react";
import { Layout } from "../layout/Layout";

import { TextDisplay } from "../components/TextDisplay";

export const Playing: FC = () => {
    return (
        <Layout>
            <div>Playing</div>
            <TextDisplay
                texts={[
                    "てきがあらわれた！！",
                    "ぶきをもて！！",
                    "たちむかうんだ！！",
                ]}
            />
        </Layout>
    );
};
