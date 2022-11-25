import React from 'react';
import EditUser from "../../ui/editUser";

function EditUserPage(props) {
    return (
        <div className="container mt-5">
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