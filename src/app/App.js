import React, {useState} from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus"
import api from "./api"

const App = () => {

    const [users, setStatus] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setStatus(users.filter(user => user._id !== userId));
    }

    const handleToggleBookmark = (id) => {

    }


    return (
        <>
            {<SearchStatus length={users.length}/>}
            {/*{<Users/>}*/}

            {/*{users.length > 0 && (*/}
            {/*    <table className="table">*/}
            {/*        <thead>*/}
            {/*        <tr>*/}
            {/*            <th scope="col">Имя</th>*/}
            {/*            <th scope="col">Качества</th>*/}
            {/*            <th scope="col">Профессия</th>*/}
            {/*            <th scope="col">Встретился, раз</th>*/}
            {/*            <th scope="col">Оценка</th>*/}
            {/*            <th scope="col">Избранное</th>*/}
            {/*            <th/>*/}
            {/*        </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody>*/}
            {/*        {users.map((user) => (*/}
            {/*            <tr key={user._id}>*/}
            {/*                <td>{user.name}</td>*/}
            {/*                <td>*/}
            {/*                    {user.qualities.map((item) => (*/}
            {/*                        <span className={"badge m-1 bg-" + item.color} key={item._id}>*/}
            {/*                            {item.name}*/}
            {/*                        </span>*/}
            {/*                    ))}*/}
            {/*                </td>*/}
            {/*                <td>{user.profession.name}</td>*/}
            {/*                <td>{user.completedMeetings}</td>*/}
            {/*                <td>{user.rate} /5</td>*/}
            {/*                <td>*/}
            {/*                    /!*<button className="bi bi-bookmark-heart-fill"></button>*!/*/}
            {/*                    <button className="bi bi-bookmark"></button>*/}
            {/*                </td>*/}
            {/*                <td>*/}
            {/*                    <button*/}
            {/*                        onClick={() => handleDelete(user._id)}*/}
            {/*                        className="btn btn-danger"*/}
            {/*                    >*/}
            {/*                        delete*/}
            {/*                    </button>*/}
            {/*                </td>*/}
            {/*            </tr>*/}
            {/*        ))}*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*)}*/}
        </>
    )
}

export default App
