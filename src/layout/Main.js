import React from "react";
import { Search } from "../conponents/Search";
import { UserList } from "../conponents/UserList";
import { AddUser } from "../conponents/AddUser";

export const Main = () => {
    return (
        <>
            <Search />
            <AddUser />
            <UserList />
        </>
    );
};
