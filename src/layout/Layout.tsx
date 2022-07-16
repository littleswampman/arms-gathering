import { FC, ReactNode } from "react";
// import { Navigate, Route, Routes } from "react-router";
// import { useLocation } from "react-router-dom";

import styles from "./layout.module.scss";

import { TextDisplay } from "../components/TextDisplay";

type Props = {
    children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => (
    <div className={`${styles.layout_div} overflow-hidden text-gray-100`}>
        <article className="h-full w-full p-2 md:p-4 lg:p-8">
            <div className="relative h-full w-full">
                {children}
                <div className="absolute bottom-0 w-full">
                    <TextDisplay />
                </div>
            </div>
        </article>
    </div>
);
