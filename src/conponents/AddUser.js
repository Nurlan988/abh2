import React from "react";
import { InputMask } from "primereact/inputmask";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPersonPlusFill } from "react-icons/bs";

import { addNewUserApi } from "../api/getUsersApi";
import {
    newuser_fullname,
    newuser_phone,
    newuser_region,
} from "../store/actions/users";
import { useNavigate } from "react-router";
import { REGEX, REPLACE_CYRILLIC, REPLACE_PHONE } from "../store/constants";

export const AddUser = () => {
    const usersReducer = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const fullname = usersReducer.newuserFullname;
    const phone = usersReducer.newuserPhone;
    const region = usersReducer.newuserRegion;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!fullname || !phone || !region) {
                return alert("Заполните все поля");
            }
            const userData = {
                fullname,
                phone: phone.replace(REPLACE_PHONE, ""),
                region,
            };

            const user = await addNewUserApi(userData);

            localStorage.setItem(
                `user_${user.data.id}`,
                JSON.stringify(user.data)
            );

            navigate(`/${user.data.id}`);

            dispatch(newuser_fullname(""));
            dispatch(newuser_phone(""));
            dispatch(newuser_region(""));
        } catch (err) {
            throw Error(err);
        }
    };

    const inputHandler = (e, actionName) => {
        let inputValue = e.target.value;

        if (!REGEX.test(inputValue)) {
            inputValue = inputValue.replace(REPLACE_CYRILLIC, "");
        }
        dispatch(actionName(inputValue));
    };

    return (
        <div className="add-user">
            <h2 style={{ marginBottom: "1rem" }}>
                Добавить нового пользователя
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ФИО</label>
                    <input
                        type="text"
                        placeholder="Введите ФИО..."
                        value={fullname}
                        onChange={(e) => inputHandler(e, newuser_fullname)}
                    />
                </div>
                <div className="form-group">
                    <label>Мобильный номер</label>
                    <InputMask
                        type="text"
                        placeholder="+7(000)000-00-00"
                        value={phone.trim()}
                        onChange={(e) =>
                            dispatch(newuser_phone(e.target.value))
                        }
                        mask="+7(999)999-99-99"
                    />
                </div>
                <div className="form-group">
                    <label>Регион</label>
                    <input
                        type="text"
                        placeholder="Введите регион..."
                        value={region}
                        onChange={(e) => inputHandler(e, newuser_region)}
                    />
                </div>
                <button className="btn">
                    Добавить <BsFillPersonPlusFill />
                </button>
            </form>
        </div>
    );
};
