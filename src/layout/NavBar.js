import React from "react";
import { BsList } from "react-icons/bs";

export const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">LOGO</div>
            <div className="navbar-burger">
                <BsList />
            </div>
        </nav>
    );
};
