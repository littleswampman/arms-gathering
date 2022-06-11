import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import { RecoilRoot } from "recoil";

import { Battle } from "./pages/Battle";
import { GameOver } from "./pages/GameOver";
import { Playing } from "./pages/Playing";
import { Start } from "./pages/Start";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <React.StrictMode>
            <RecoilRoot>
                <Routes>
                    <Route path="battle" element={<Battle />} />
                    <Route path="game-over" element={<GameOver />} />
                    <Route path="playing" element={<Playing />} />
                    <Route path="start" element={<Start />} />

                    <Route path="*" element={<Navigate to="start" />} />
                </Routes>
            </RecoilRoot>
        </React.StrictMode>
    </BrowserRouter>,
);
