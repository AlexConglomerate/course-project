import React, {useState} from "react";
// {useState} - это добавление хука useState
import {fetchAll} from "./API/fake.api/user.api";

const Table = () => {

    const [users, setUsers] = useState(0)
    const [dog, setDogs] = useState(["dog1", "dog2", "dog3"])


    const btnClick = () => {
        setUsers(users + 1)

        // Если нужно два раза:

        // // не работает
        // setUsers(users + 1)
        // setUsers(users + 1)

        // // Работает. prevState - текущее значение
        // setUsers(prevState => prevState + 1)
        // setUsers(prevState => prevState + 1)
        console.log(users)
    }

    const createHeader = () => {
        let text = `Надпись`
        let cls = "h3 fw-bold text-white m-1 p-1 rounded-pill bg-primary"

        let btn = <div
            className="btn btn-danger"
            onClick={() => btnClick()}
        > My button</div>

        return (
            <> {/* <> - не будет отображаться в HTML. () - чтобы return понимал границы return*/}
                <span className={cls}> {text} </span>
                <span>{btn}</span>
            </>)
    }

    const createDogList = () => {
        dog.map(i => console.log(`123`))
        dog.map(i => (
            <li
                // key={i}
                // onClick={btnClick}
            >
                {i}
            </li>
        ))
    }

    return (

        <>
            {createHeader()}
            {createDogList()}
        </>
    )
}

export default Table
