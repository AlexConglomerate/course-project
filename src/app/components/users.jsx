import React, {useState} from "react";
import User from "./user"

const Users = ({users, ...rest}) => {
    console.log(users)
    if (users.length === 0) return
    return (<table className="table">
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
                    user={user}
                    {...rest}
                />
            ))}
            </tbody>
        </table>
    )
}

export default Users
