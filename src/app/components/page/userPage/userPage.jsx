import React, {useEffect, useRef, useState} from "react";
import api from "../../../api";
import {useHistory} from "react-router-dom";
import {useParams} from "react-router-dom";
import Comments from "./comments";
import {orderBy} from "lodash";
import UserCard from "./userCard";
import AddComment from "./addComment";
import CommentList from "./commentList";


function UserPage({userId}) {
    const textComment = useRef()
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
        console.log(comment)
    }

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
        api.users.fetchAll().then((data) => setUsers(data))
        updateComment()
    }, []);

    const handleClick = () => history.push(`/users/${user._id}/edit`)

    const handleRefresh = (text, selectName) => {
        if (selectName.current.value === 'Выберите пользователя') {
            window.alert('Выберите пользователя')
            return
        }
        if (text.current.value === '') {
            window.alert('Напишите комментарий')
            return
        }
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
                    <UserCard
                        user={user}
                        handleClick={handleClick}
                    />
                </div>

                <div className="col-md-8">
                    <AddComment
                        handleRefresh={handleRefresh}
                        users={users}
                        textComment={textComment}
                        selectName={selectName}
                    />

                    <CommentList
                        comment={comment}
                        handleRemoveComment={handleRemoveComment}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserPage;