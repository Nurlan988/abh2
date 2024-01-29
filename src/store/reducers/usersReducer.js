import {
    FILTER_FULLNAME,
    FILTER_REGION,
    SET_SEARCH,
    SET_FILTERED_USERS,
    SET_USERS,
    DELETE_USER,
    NEWUSER_FULLNAME,
    NEWUSER_PHONE,
    NEWUSER_REGION,
    SET_USER_DETAILS,
    IS_EDIT,
    NEWUSER_STATUS,
} from "../constants";

const initialState = {
    users: [],
    userDetails: null,
    filteredUsers: [],
    selectedRegion: false,
    selectedFullname: false,
    searchUsers: "",
    newuserFullname: "",
    newuserPhone: "",
    newuserRegion: "",
    newuserStatus: "",
    isEdit: false,
};
const usersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_USERS:
            return {
                ...state,
                users: payload,
            };
        case SET_USER_DETAILS:
            return {
                ...state,
                userDetails: payload,
            };
        case SET_FILTERED_USERS:
            return {
                ...state,
                filteredUsers: payload,
            };
        case FILTER_REGION:
            return {
                ...state,
                selectedRegion: !state.selectedRegion,
            };
        case FILTER_FULLNAME:
            return {
                ...state,
                selectedFullname: !state.selectedFullname,
            };
        case SET_SEARCH:
            return {
                ...state,
                searchUsers: payload,
            };
        case DELETE_USER:
            return {
                ...state,
                users: payload,
            };
        case NEWUSER_FULLNAME:
            return {
                ...state,
                newuserFullname: payload,
            };
        case NEWUSER_PHONE:
            return {
                ...state,
                newuserPhone: payload,
            };
        case NEWUSER_REGION:
            return {
                ...state,
                newuserRegion: payload,
            };
        case NEWUSER_STATUS:
            return {
                ...state,
                newuserStatus: payload,
            };
        case IS_EDIT:
            return {
                ...state,
                isEdit: !state.isEdit,
            };
        default:
            return state;
    }
};

export default usersReducer;
