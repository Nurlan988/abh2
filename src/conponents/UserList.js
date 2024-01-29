import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

import { UserData } from "./UserData";
import { getAllUsersApi } from "../api/getUsersApi";
import {
    filter_fullname,
    filter_region,
    setFilteredUsers,
    setUsers,
} from "../store/actions/users";
import { FULLNAME, REGION } from "../constants";
import { orderedColumn } from "../commons";

export const UserList = () => {
    const usersReducer = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    const filteredUsers = usersReducer.filteredUsers;
    const selectedFullname = usersReducer.selectedFullname;
    const selectedRegion = usersReducer.selectedRegion;

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await getAllUsersApi();
                dispatch(setUsers(data.data));
                dispatch(setFilteredUsers(data.data));
            } catch (err) {
                throw Error(err);
            }
        };
        getUsers();
    }, [dispatch]);

    useEffect(() => {
        if (selectedFullname) {
            const data = orderedColumn(filteredUsers, FULLNAME);
            dispatch(setFilteredUsers(data));
        }
        if (selectedRegion) {
            const data = orderedColumn(filteredUsers, REGION);
            dispatch(setFilteredUsers(data));
        }
    }, [selectedFullname, selectedRegion, filteredUsers, dispatch]);

    const handleOrder = (column) => {
        if (!filteredUsers.length) return null;

        if (column === FULLNAME) {
            if (selectedRegion) {
                dispatch(filter_region());
            }
            dispatch(filter_fullname());
        }

        if (column === REGION) {
            if (selectedFullname) {
                dispatch(filter_fullname());
            }
            dispatch(filter_region());
        }
    };

    return (
        <div className="user-list">
            <table>
                <thead>
                    <tr>
                        <th>
                            <div
                                className="ordered-table"
                                onClick={() => handleOrder(FULLNAME)}
                            >
                                <span>ФИО</span>
                                {selectedFullname ? (
                                    <BsArrowUp />
                                ) : (
                                    <BsArrowDown />
                                )}
                            </div>
                        </th>
                        <th>Дата регистрации</th>
                        <th>Мобильный номер</th>
                        <th>
                            <div
                                className="ordered-table"
                                onClick={() => handleOrder(REGION)}
                            >
                                <span>Регион</span>
                                {selectedRegion ? (
                                    <BsArrowUp />
                                ) : (
                                    <BsArrowDown />
                                )}
                            </div>
                        </th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length ? (
                        filteredUsers.map((user) => (
                            <UserData data={user} key={user.id} />
                        ))
                    ) : (
                        <tr>
                            <td style={{ textAlign: "center" }} colSpan={5}>
                                Пользователи не найдены
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
