import React from 'react';
import PropTypes from "prop-types";

function GroupList({items, valueProperty, contentProperty, onItemSelect, selectedItem}) {

    const toArray = (elem) => {
        return typeof elem === 'object'
            ? Object.values(elem)
            : elem
    }

    return (
        <>
            <ul className="list-group">

                {toArray(items).map(item => {
                    return (
                        <button className={"list-group-item" +
                            (item === selectedItem ? " active" : "")}
                                key={item[valueProperty]}
                                onClick={() => onItemSelect(item)}
                        >
                            {item[contentProperty]}
                        </button>
                    )
                })}
            </ul>
        </>
    );
}

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
}

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object,
}


export default GroupList;