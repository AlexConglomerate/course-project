import React from 'react';
// import User from "./user";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Bookmark from "./bookmark";
import BookMark from "./bookmark";


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
        qualities: {name: 'Качества'},
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
        <table className="table">
            <TableHeader {...{onSort, selectedSort, columns}}/>
            <TableBody {...{columns, data: users}}/>
        </table>
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