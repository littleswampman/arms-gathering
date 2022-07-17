import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import { RecoilRoot } from "recoil";

import { ManageGameProgress } from "./components/ManageGameProgress";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <React.StrictMode>
            <RecoilRoot>
                <Routes>
                    <Route path="" element={<ManageGameProgress />} />

                    <Route path="*" element={<Navigate to="" />} />
                </Routes>
            </RecoilRoot>
        </React.StrictMode>
    </BrowserRouter>,
);
