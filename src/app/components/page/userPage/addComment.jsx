import React from 'react';

function AddComment({handleRefresh, users, textComment, selectName}) {
    return (
        <>
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
                                ref={textComment}
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                    <button
                        onClick={() => handleRefresh(textComment, selectName)}
                        className='btn btn-primary float-end'
                    > Опубликовать
                    </button>
                </div>
            </div>
        </>
    );
}

export default AddComment;