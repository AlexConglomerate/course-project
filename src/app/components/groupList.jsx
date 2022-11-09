import React from 'react';
import PropTypes from "prop-types";

function GroupList({items, valueProperty, contentProperty, onItemSelect, selectedItem}) {
    console.log(23, items)
    return (
        <>
            <ul className="list-group">
                {Object.keys(items).map(item => {
                    return (
                        // <li className={"list-group-item"}
                        <button className={"list-group-item" +
                            (items[item] == selectedItem ? " active" : "")}
                            key={items[item][valueProperty]}
                            onClick={() => onItemSelect(items[item])}
                        >
                            {items[item][contentProperty]}

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
    item: PropTypes.object.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object,
}


export default GroupList;