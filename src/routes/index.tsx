import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "../pages";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/details/:id" element={<></>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
};
