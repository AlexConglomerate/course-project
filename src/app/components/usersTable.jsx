import React from 'react';
// import User from "./user";
import PropTypes from "prop-types";
// import TableHeader from "./tableHeader";
// import TableBody from "./tableBody";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";


function UsersTable({
                        users,
                        onSort,
                        selectedSort,
                        onToggleBookmark,
                        onDelete,
                        ...rest
                    }) {
    const columns = {
        name: {path: 'name', name: 'Имя'},
        qualities: {name: 'Качества', component: (user) => (<QualitiesList qualities={user.qualities}/>)},
        professions: {path: 'profession.name', name: 'Профессия'},
        completedMeetings: {path: 'completedMeetings', name: 'Встретился, раз'},
        rate: {path: 'rate', name: 'Оценка'},

        bookmark: {
            path: 'bookmark', name: 'Избранное',
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    user={user}
                    onToggleBookmark={user._id}
                    {...rest}
                />
            )
        },

        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        },
    }

    return (
            <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}/>
    );
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default UsersTable;