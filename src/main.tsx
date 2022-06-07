import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <React.StrictMode>
            <Routes>
                <Route path="/" element={<App />} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </React.StrictMode>
    </BrowserRouter>,
);
