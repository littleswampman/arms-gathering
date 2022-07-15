import React, { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    onClick: () => void;
};

export const Button: FC<Props> = ({ children, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
        {children}
    </button>
);
