import React, {useEffect, useRef, useState} from "react";
import api from "../../../api";
import {useHistory} from "react-router-dom";
import {useParams} from "react-router-dom";
import Comments from "./comments";
import {orderBy} from "lodash";
import UserCard from "./userCard";


function UserPage({userId}) {
    const inputRef = useRef()
    const selectName = useRef()
    const params = useParams()
    const history = useHistory()

    const [user, setUser] = useState()
    const [comment, setComment] = useState()
    const [users, setUsers] = useState()

    const updateComment = () => {
        api.comments.fetchCommentsForUser(params.userId).then((data) => {
            setComment(orderBy(data, ['created_at'], ['desc']))
        })
    }

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
        api.users.fetchAll().then((data) => setUsers(data))
        updateComment()
    }, []);


    const handleClick = () => history.push(`/users/${user._id}/edit`)

    const handleRefresh = (text, selectName) => {
        console.log(`text, selectName`, text.current.value, selectName.current.value)
        api.comments.add({
            userId: users.find(item => item.name == selectName.current.value)._id,
            pageId: userId,
            content: text.current.value,
        },).then()
        text.current.value = ''
        selectName.current.value = ''
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
                    <UserCard user={user} handleClick={handleClick}/>
                </div>

                <div className="col-md-8">
                    <div className="card mb-2">
                        <div className="card-body">
                            <div>
                                <h2>New comment</h2>
                                <select className="form-select mb-4" name="userId" ref={selectName}>
                                    <option selected>Выберите пользователя</option>
                                    {users &&
                                        users.map(item => (
                                            <option key={item._id}>
                                                {item.name}
                                            </option>
                                        ))
                                    }
                                </select>

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
                                onClick={() => handleRefresh(inputRef, selectName)}
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

export default UserPage;