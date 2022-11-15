import React from 'react';
import User from "./user";
import PropTypes from "prop-types";

function UsersTable({users, ...rest}) {
    return (
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
            {users.map((user) => (
                <User
                    key={user._id}
                    user={user}
                    {...rest}
                />
            ))}
            </tbody>
        </table>
    );
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired
}

export default UsersTable;