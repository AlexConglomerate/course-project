import React, {useState, useEffect} from "react";
import Pagination from "./pagination";
import {paginate} from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus"
import UsersTable from "./usersTable";
import _ from "lodash"


const Users = () => {
    const pageSize = 8
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({iter: "name", order: "asc"});
    const [users, setUsers] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])


    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId))
    }

    const handleToggleBookmark = (id) => {
        const newArr = users.map(i => {
                if (i._id === id) {
                    i.bookmark = i.bookmark === false ? true : false
                }
                return i
            }
        )
        setUsers(newArr)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf]);


    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    if (users) {
        const filteredUsers = selectedProf // && selectedProf._id
            ? users.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users
        const count = filteredUsers.length
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
        const userCrop = paginate(sortedUsers, currentPage, pageSize)
        const clearFilter = () => {
            setSelectedProf()
        }
        return (
            <>
                <div className="d-flex">
                    {professions && (
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                items={professions}
                                selectedItem={selectedProf}
                                onItemSelect={handleProfessionSelect}
                            />
                            <button
                                className={"btn btn-secondary mt-2"}
                                onClick={clearFilter}>Очистить
                            </button>
                        </div>
                    )}

                    <div className="d-flex flex-column">
                        {<SearchStatus length={count}/>}

                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                        />

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
            </>
        )
    }
    return 'loading ...'
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
}

export default Users
