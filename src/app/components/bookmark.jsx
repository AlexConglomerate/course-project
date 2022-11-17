import React from "react";

const BookMark = ({status, ...rest}) => {
    const name = () => {
        return status === true ? "bi bi-bookmark-heart-fill" : "bi bi-bookmark"
    }
    return (
        <button
            className={name()}
            onClick={() => rest.onBookMark(rest.user._id)}
        ></button>
    )
}

export default BookMark