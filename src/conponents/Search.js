import React from "react";
import { BsSearch } from "react-icons/bs";
import { setFilteredUsers, set_search } from "../store/actions/users";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import { filterOnSearch } from "../commons";

export const Search = () => {
    const usersReducer = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    const searchUsers = usersReducer.searchUsers;
    const users = usersReducer.users;

    const debouncedSearch = useDebounce(searchHandler, 300);

    function searchHandler(value) {
        const search = filterOnSearch(users, value);
        dispatch(setFilteredUsers(search));
    }

    const handleSearch = (e) => {
        dispatch(set_search(e.target.value));
        debouncedSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(set_search(""));
    };

    return (
        <>
            <form className="search" onSubmit={handleSubmit}>
                <div className="input-field">
                    <label form="search">Поиск пользователей</label>
                    <div className="search-field">
                        <button className="search-icon">
                            <BsSearch />
                        </button>
                        <input
                            id="search"
                            type="search"
                            placeholder="Поиск..."
                            value={searchUsers}
                            onInput={handleSearch}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};
