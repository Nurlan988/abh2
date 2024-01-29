import {
    DELETE_USER,
    FILTER_FULLNAME,
    FILTER_REGION,
    NEWUSER_FULLNAME,
    NEWUSER_PHONE,
    NEWUSER_REGION,
    SET_FILTERED_USERS,
    SET_SEARCH,
    SET_USERS,
    SET_USER_DETAILS,
    IS_EDIT,
    NEWUSER_STATUS,
} from "../constants";

export const setUsers = (payload) => ({
    type: SET_USERS,
    payload,
});

export const setUserDetails = (payload) => ({
    type: SET_USER_DETAILS,
    payload,
});

export const setFilteredUsers = (payload) => ({
    type: SET_FILTERED_USERS,
    payload,
});

export const filter_fullname = () => ({
    type: FILTER_FULLNAME,
});

export const filter_region = () => ({
    type: FILTER_REGION,
});

export const set_search = (payload) => ({
    type: SET_SEARCH,
    payload,
});

export const delete_user = (payload) => ({
    type: DELETE_USER,
    payload,
});

export const newuser_fullname = (payload) => ({
    type: NEWUSER_FULLNAME,
    payload,
});

export const newuser_phone = (payload) => ({
    type: NEWUSER_PHONE,
    payload,
});

export const newuser_region = (payload) => ({
    type: NEWUSER_REGION,
    payload,
});

export const newuser_status = (payload) => ({
    type: NEWUSER_STATUS,
    payload,
});

export const set_edit_state = () => ({
    type: IS_EDIT,
});
