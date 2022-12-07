import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserPageNew from "../components/page/userPage/userPageNew";
const Users = () => {
    const params = useParams();
    const { userId } = params;
    // return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
    return <>{userId ? <UserPageNew userId={userId} /> : <UsersListPage />}</>;
};

export default Users;
