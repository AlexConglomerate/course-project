import React from 'react';
import Comments from "./comments";

function CommentList({comment, handleRemoveComment}) {
    return (
        <>
            {Boolean(comment.length) &&
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr/>
                        {comment.map(item => (
                            <Comments
                                key={item._id}
                                props={item}
                                handleRemoveComment={handleRemoveComment}/>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}

export default CommentList;