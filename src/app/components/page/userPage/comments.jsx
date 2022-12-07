import React, {useEffect, useState} from 'react';
import api from "../../../api";
import moment, {unix} from "moment";

function Comments({props, handleRemoveComment}) {
    const {content, created_at, pageId, userId, _id} = props
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data.name));
    }, []);

    if (props.length === 0) return
    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />

                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                        {user}
                                        <span className="small">
                                            {" " + moment(unix(created_at / 1000), 'HH:mm:ss').fromNow()}
                                        </span>
                                    </p>
                                    <button className="btn btn-sm text-primary d-flex align-items-center">
                                        <i className="bi bi-x-lg"
                                           onClick={() => handleRemoveComment(_id)}
                                        ></i>
                                    </button>
                                </div>
                                <p className="small mb-0">
                                    {content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comments;