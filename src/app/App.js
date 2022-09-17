import React from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus"
import api from "./api"

function App() {
    const [users, setStatus] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {

    }

    const handleToggleBookmark = (id) => {

    }

    return (
        <div>

        </div>
    )
}

export default App