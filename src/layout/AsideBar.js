import React from "react";
import { AsideBarItem } from "../conponents/AsideBarItem";

const asideBarItems = ['Список пользователей', 'Счет', 'История', 'Новая запись', 'Категории']

export const AsideBar = () => {
    return (
        <aside >
            <ul className="app-sidenav">
                {asideBarItems.map(item => (
                    <AsideBarItem key={item} text={item}/>
                ))}
            </ul>
        </aside>
    );
};
