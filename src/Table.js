import React, {useState} from "react";
import {fetchAll} from "./API/fake.api/user.api";

const Table = () => {

    const [users, setUsers] = useState(fetchAll())

    const deleteUser = (id) => {
        setUsers(prevState => prevState.filter(a => a._id != id))
    }

    const createHeader = () => {
        let count = users.length

        // create text
        let addText = ""
        if (count > 1 && count < 5 || count > 21) addText = "a"
        let text = `${count} человек${addText} тусанет с тобой сегодня`
        if (count == 0) text = `Никто с тобой не тусанет`

        //create color
        let cls = "h3 fw-bold text-white m-1 p-1 rounded-pill bg-"
        count == 0 ? cls += "danger" : cls += "primary"

        return <span className={cls}> {text} </span>

    }

    const createTable = () => {
        if (users.length == 0) return <img
            src="https://www.meme-arsenal.com/memes/9a03f2e29dcaab7c64defc4afb265a5c.jpg"/>

        return <table className="table table-hover">
            <thead>
            <tr>
                <td>Имя</td>
                <td>Качества</td>
                <td>Профессия</td>
                <td>Встретился, раз</td>
                <td>Оценка</td>
                <td>Button</td>
            </tr>
            </thead>

            <tbody>
            {users.map(item => (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.qualities.map(a => {
                        let clr = "badge m-1 p-1 bg-" + a.color
                        return <span className={clr}>
                            {a.name}
                        </span>
                    })}</td>
                    <td>{item.profession.name}</td>
                    <td>{item.completedMeetings}</td>
                    <td>{item.rate + "/5"}</td>
                    <td>{
                        <div
                            className="btn btn-danger"
                            onClick={() => deleteUser(item._id)}
                        >
                            Delete</div>}</td>
                </tr>
            ))}
            </tbody>
        </table>
    }

    return (

        <>
            {createHeader()}
            <br/>HiHiHiHiHiHi<br/>
            {createTable()}
        </>
    )
}

export default Table
