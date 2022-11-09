import React, {useState, useEffect} from "react";
import User from "./user"
import Pagination from "./pagination";
import {paginate} from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";

const Users = ({users, ...rest}) => {
    const count = users.length
    const pageSize = 4
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
        // api.professions.fetchAll().then((data) => setProfessions(
        //     Object.assign(
        //         data,
        //         {allProfession: {name: "Все профессии"}}
        //     )))
    }, [])

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
        console.log(selectedProf)
    }

    if (count === 0) return

    const filteredUsers = selectedProf // && selectedProf._id
        ? users.filter(user => user.profession === selectedProf)
        : users
    const userCrop = paginate(filteredUsers, currentPage, pageSize)
    const clearFilter = () => {
        setSelectedProf()
    }
    return (
        <>
            {professions && (
                <>
                    <GroupList
                        items={professions}
                        selectedItem={selectedProf}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className={"btn btn-secondary mt-2"}
                        onClick={clearFilter}>Очистить
                    </button>
                </>
            )}

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {userCrop.map((user) => (
                    <User
                        key={user._id}
                        user={user}
                        {...rest}
                    />
                ))}
                </tbody>
            </table>
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    )
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
}

export default Users
