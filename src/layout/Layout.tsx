import { FC, ReactNode } from "react";
// import { Navigate, Route, Routes } from "react-router";
// import { useLocation } from "react-router-dom";

import styles from "./layout.module.scss";

type Props = {
    children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
    return (
        <div className={`${styles.layout_div} overflow-hidden text-gray-100`}>
            <article className="h-screen w-screen p-2 md:p-4 lg:p-8">
                {children}
            </article>
        </div>
    );
};
