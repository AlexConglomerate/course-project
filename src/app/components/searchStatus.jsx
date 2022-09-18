import React from "react";

const searchStatus = ({length}) => {

    const wordAdd = (length) => {
        const lastOne = Number(length.toString().slice(-1));
        if (length > 4 && length < 15) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        if (lastOne === 1) return "человек тусанет";
        return "человек тусанет";
    }

    const text = (length) => {
        if (length === 0) return "Никто с тобой не тусанет"
        return `${length + " " + wordAdd(length)} с тобой сегодня`
    }

    const createClass = (length) => {
        if (length > 0) return "badge bg-primary"
        return "badge bg-danger"
    }

    return (
        <h2>
            <span className={createClass(length)}> {text(length)} </span>
        </h2>
    )
}

export default searchStatus