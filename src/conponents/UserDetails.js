import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
    BsArrowBarLeft,
    BsFillTrash3Fill,
    BsFillPencilFill,
    BsFloppyFill,
} from "react-icons/bs";
import { dateFormatter } from "../commons";
import { deleteUserApi, editUserApi, getAllUsersApi } from "../api/getUsersApi";
import {
    newuser_fullname,
    newuser_phone,
    newuser_region,
    newuser_status,
    setUserDetails,
    set_edit_state,
} from "../store/actions/users";
import { ACTIVE, INACTIVE, SUSPENDED } from "../constants";
import { InputMask } from "primereact/inputmask";
import { REPLACE_PHONE } from "../store/constants";

export default function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const usersReducer = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    const isEdit = usersReducer.isEdit;
    const filteredUsers = usersReducer.filteredUsers;
    const userDetails = usersReducer.userDetails;

    const newuserFullname = usersReducer.newuserFullname;
    const newuserPhone = usersReducer.newuserPhone;
    const newuserRegion = usersReducer.newuserRegion;
    const newuserStatus = usersReducer.newuserStatus;

    useEffect(() => {
        async function getUserDetails() {
            const users = await getAllUsersApi();
            const userData = users.data.find((u) => u.id === id);
            dispatch(setUserDetails(userData));
        }
        getUserDetails();
    }, [id, filteredUsers, dispatch]);

    const goBackHandler = () => {
        navigate(-1);
        if (isEdit) {
            dispatch(set_edit_state());
        }
    };

    const editHandler = () => {
        dispatch(set_edit_state());
        if (!isEdit) {
            dispatch(newuser_fullname(userDetails.fullname));
            dispatch(newuser_phone(userDetails.phone));
            dispatch(newuser_region(userDetails.region));
            dispatch(newuser_status(userDetails.status));
        } else {
            const editedUserData = {
                id: id,
                fullname: newuserFullname,
                created_at: userDetails.created_at,
                phone: newuserPhone.replace(REPLACE_PHONE, ""),
                region: newuserRegion,
                status: newuserStatus,
            };

            const editUser = async (data) => {
                try {
                    await editUserApi(data);
                } catch (err) {
                    throw Error(err);
                }
            };

            if (
                !newuserFullname ||
                !newuserPhone ||
                !newuserRegion ||
                !newuserStatus
            ) {
                return alert("Заполните все поля");
            }
            editUser(editedUserData);

            navigate(-1);

            dispatch(newuser_fullname(""));
            dispatch(newuser_phone(""));
            dispatch(newuser_region(""));
            dispatch(newuser_status(""));
        }
    };

    const deleteHandler = () => {
        const deleteUser = async (id) => {
            try {
                await deleteUserApi(id);
                localStorage.removeItem(`user_${id}`);
                navigate(-1);
            } catch (err) {
                throw Error(err);
            }
        };
        deleteUser(id);
    };

    return (
        <>
            {userDetails ? (
                <div>
                    <h2>
                        {!isEdit ? (
                            userDetails?.fullname
                        ) : (
                            <input
                                className="edit-input"
                                type="text"
                                value={newuserFullname}
                                onChange={(e) =>
                                    dispatch(newuser_fullname(e.target.value))
                                }
                            />
                        )}
                        {}
                    </h2>
                    <br />
                    <div>
                        Дата регистрации:{" "}
                        {dateFormatter(userDetails.created_at)}
                    </div>
                    <br />
                    <div>
                        Мобильный номер:
                        {!isEdit ? (
                            userDetails.phone
                        ) : (
                            <InputMask
                                type="text"
                                className="edit-input"
                                placeholder="+7(000)000-00-00"
                                value={newuserPhone.trim()}
                                onChange={(e) =>
                                    dispatch(newuser_phone(e.target.value))
                                }
                                mask="+7(999)999-99-99"
                            />
                        )}
                    </div>
                    <br />
                    <div>
                        Адрес проживания:
                        {!isEdit ? (
                            userDetails.region
                        ) : (
                            <input
                                className="edit-input"
                                type="text"
                                value={newuserRegion}
                                onChange={(e) =>
                                    dispatch(newuser_region(e.target.value))
                                }
                            />
                        )}
                    </div>
                    <br />
                    <div>
                        Статус:
                        {!isEdit ? (
                            userDetails.status
                        ) : (
                            <select
                                value={newuserStatus}
                                onChange={(e) =>
                                    dispatch(newuser_status(e.target.value))
                                }
                            >
                                <option value={ACTIVE}>{ACTIVE}</option>
                                <option value={INACTIVE}>{INACTIVE}</option>
                                <option value={SUSPENDED}>{SUSPENDED}</option>
                            </select>
                        )}
                    </div>
                </div>
            ) : (
                <div style={{ fontSize: "24px" }}>
                    Пользователь не найдет, что-то пошло не так...
                </div>
            )}
            <div className="uesr-details-buttons">
                <button
                    className="btn uesr-details-go-back"
                    onClick={goBackHandler}
                >
                    <BsArrowBarLeft /> Назад
                </button>
                {userDetails && (
                    <>
                        <button
                            className="btn uesr-details-edit"
                            onClick={editHandler}
                        >
                            {!isEdit ? (
                                <>
                                    Редактировать
                                    <BsFillPencilFill />
                                </>
                            ) : (
                                <>
                                    Сохранить
                                    <BsFloppyFill />
                                </>
                            )}
                        </button>
                        <button
                            className="btn uesr-details-delete"
                            disabled={isEdit}
                            onClick={deleteHandler}
                        >
                            Удалить <BsFillTrash3Fill />
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
