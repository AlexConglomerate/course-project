import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {paginate} from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import Search from "./search";

const UsersList = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({path: "name", order: "asc"});
    const [users, setUsers] = useState();
    const [search, setSearch] = useState()
    const [usersCrop, setUsersCrop] = useState();

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    const handleChange = e => setSearch(e.target.value)
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return {...user, bookmark: !user.bookmark};
            }
            return user;
        });
        setUsers(newArray);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const clearFilter = () => setSelectedProf()
    const clearSearch = () => setSearch('')

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.users.fetchAll().then((data) => {
            setUsers(data)
            setUsersCrop(data)
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        clearSearch()
        const filteredUsers = selectedProf
            ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users;
        setUsersCrop(filteredUsers)
    }, [selectedProf])

    useEffect(() => {
        clearFilter()
        const filteredUsers = search
            ? users.filter(((user) => user.name.includes(search)))
            : users
        setUsersCrop(filteredUsers)
    }, [search])


    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    if (!usersCrop) return "loading..."
    const count = usersCrop.length;
    const sortedUsers = _.orderBy(usersCrop, [sortBy.path], [sortBy.order]);
    const showUsers = paginate(sortedUsers, currentPage, pageSize)

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        {" "}
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count}/>
                <Search onChange={handleChange}/>
                {count > 0 && (
                    <UserTable
                        users={showUsers}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;
