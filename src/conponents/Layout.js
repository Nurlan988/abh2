import React from "react";
import { AsideBar } from "../layout/AsideBar";
import { NavBar } from "../layout/NavBar";
import { Outlet } from "react-router";

const Layout = () => {
    return (
        <div className="app-main-layout">
            <AsideBar />
            <NavBar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};
export default Layout;
