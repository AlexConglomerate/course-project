import React, {useEffect, useState} from 'react';
import api from "../../../api";

function UserPageTest(props) {
    const [comment, setComment] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        api.comments.fetchAll().then((data) => setComment(data));
        api.users.getById('67rdca3eeb7f6fgeed471815').then((data) => setUser(data));
        console.log(comment)
    }, []);

    if (!user || !comment) return 'Loading . . .'
    const filterComments = comment.filter(item => item.pageId === '67rdca3eeb7f6fgeed471815')
    // const arr = comment.map(i => console.log(i))
    console.log(filterComments)
    return (
        <div>
            hello
        </div>
    );
}

export default UserPageTest;