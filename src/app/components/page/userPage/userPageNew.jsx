import React, {useEffect, useRef, useState} from "react";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import {useHistory} from "react-router-dom";
import {useParams} from "react-router-dom";
import Comments from "./comments";


function UserPageNew({userId}) {
    const inputRef = useRef();
    const params = useParams();
    const history = useHistory();

    const [user, setUser] = useState();
    const [comment, setComment] = useState();
    const [users, setUsers] = useState();
    const [changeUser, setChangeUser] = useState();

    const updateComment = () => {
        api.comments.fetchCommentsForUser(params.userId).then((data) => setComment(data));
    }

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.users.fetchAll().then((data) => setUsers(data));
        updateComment()
    }, []);


    const handleChangeUser = (user) => {
        console.log(user)
        setChangeUser(user)
    }

    const handleClick = () => history.push(`/users/${user._id}/edit`)

    const handleRefresh = (ref) => {
        api.comments.add({
            userId: "67rdca3eeb7f6fgeed471815",
            pageId: userId,
            content: ref.current.value,
        },).then()
        ref.current.value = ''
        updateComment()
    }

    const handleRemoveComment = (id) => {
        api.comments.remove(id).then();
        updateComment()
    }

    if (!user || !comment) return <h1>Loading</h1>

    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card mb-3">
                        <div className="card-body">
                            <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                                <i className="bi bi-gear" onClick={handleClick}></i>
                            </button>
                            <div className="d-flex flex-column align-items-center text-center position-relative">
                                <img src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                                    .toString(36)
                                    .substring(7)}.svg`}
                                     className="rounded-circle shadow-1-strong me-3"
                                     alt="avatar"
                                     width="150"
                                />

                                <div className="mt-3">
                                    <h4>{user.name}</h4>
                                    <p className="text-secondary mb-1">{user.profession.name}</p>
                                    <div className="text-muted">
                                        <i className="bi bi-caret-down-fill text-primary                                            "
                                           role="button"
                                        ></i>
                                        <i className="bi bi-caret-up text-secondary"
                                           role="button"
                                        ></i>
                                        <span className="ms-2">{user.rate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div
                            className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
                        >
                            <h5 className="card-title">
                                <span>Qualities</span>
                            </h5>
                            <p className="card-text">
                                <Qualities qualities={user.qualities}/>
                            </p>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Completed meetings</span>
                                </h5>

                                <h1 className="display-1">{user.completedMeetings}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card mb-2">
                        <div className="card-body">
                            <div>
                                <h2>New comment</h2>
                                <div className="mb-4">
                                    <select className="form-select"
                                            name="userId"
                                            value="">
                                        <option disabled value={changeUser} selected>
                                            Выберите пользователя
                                        </option>
                                        {users &&
                                            users.map(item => (
                                                <option
                                                    key={item._id}
                                                    onClick={() => handleChangeUser("item.name")}
                                                >
                                                    {item.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="exampleFormControlTextarea1"
                                        className="form-label"
                                    >Сообщение</label
                                    >
                                    <textarea
                                        ref={inputRef}
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRefresh(inputRef)}
                                className='btn btn-primary float-end'
                            > Опубликовать
                            </button>
                        </div>
                    </div>

                    {Boolean(comment.length) &&
                        <div className="card mb-3">
                            <div className="card-body">
                                <h2>Comments</h2>
                                <hr/>
                                {comment.map(item => (
                                    <Comments props={item} handleRemoveComment={handleRemoveComment}/>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserPageNew;