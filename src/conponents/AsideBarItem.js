import React from "react";

export const AsideBarItem = ({text}) => {
    return (
        <li className="asid-bar-item">
            <div className="pointer">
                {text}
            </div>
        </li>
    );
};
