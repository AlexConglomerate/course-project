import React from 'react';
import EditUser from "../../ui/editUser";
import {useHistory} from "react-router-dom";

function EditUserPage(props) {
    const history = useHistory();
    const handleClick = () => {
        const userId = props.match.params.userId
        history.push(`/users/${userId}`);
    };
    return (
        <div className="container mt-5">
            <button
                className="btn btn-primary"
                onClick={handleClick}
            >
                <i className="bi bi-backspace"> </i>
                Назад
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <>
                        <h3 className="mb-4"></h3>
                        <EditUser props={props}/>
                    </>
                </div>
            </div>
        </div>
    )
}

export default EditUserPage;