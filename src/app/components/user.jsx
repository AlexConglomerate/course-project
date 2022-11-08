import React from "react";
import Quality from "./quality";
import BookMark from "./bookmark";

const User = ({user, ...rest}) => {
    return (
        <tr key={user._id}>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((item) => <Quality {...item} key={item._id}/>)}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate} /5</td>
            <td>
                <BookMark
                    status={user.bookmark}
                    user={user}
                    {...rest}
                />
            </td>
            <td>
                <button
                    onClick={() => rest.onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            </td>
        </tr>
    )
}

export default User