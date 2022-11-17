import React, {useState, useEffect} from "react";
import Users from "./components/users";
import api from "./api"

const App = () => {

    const [users, setUsers] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    },[])


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

    return (
        <>
            {(users &&
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onBookMark={handleToggleBookmark}
                />
            )}
        </>
    )
}

export default App
