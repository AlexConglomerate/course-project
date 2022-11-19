// import getById from "../api/fake.api/user.api";
import React, {useEffect, useState} from "react";
import api from "../api";
import QualitiesList from "./qualitiesList";
import {Link} from "react-router-dom";

const User = (props) => {
    const id = props.match.params.userId
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    const handleBack = () => {
        props.history.push('/users') // оставляем возможность вернуться назад на станицу
        // если заменить history на replace, то обратно человек не сможет возвратиться
    //    т.е. не будет перехода на новую страницу, страница будет заменена
    }


    if (!user) return (<>Loading ...</>)
    return (
        <>
            <h1>{user.name}</h1>
            <h1>Профессия: {user.profession.name}</h1>
            <QualitiesList qualities={user.qualities}/>
            <h1>CompletedMeetings: {user.completedMeetings}</h1>
            <h1>Rate: {user.rate}</h1>
            {/*<button><Link to='/users'> Все пользователи </Link></button>*/}
            <button onClick={() => {
                handleBack()
            }}> Все пользователи </button>
        </>
    )
};
export default User;
