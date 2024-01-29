import React from "react";
import { NavLink } from "react-router-dom";

const CustomLink = ({ children, to, ...props }) => {
    return (
        <>
            <NavLink to={to} {...props}>
                {children}
            </NavLink>
        </>
    );
};

export default CustomLink;
