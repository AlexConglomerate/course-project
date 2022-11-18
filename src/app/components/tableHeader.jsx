import React from 'react';
import PropTypes from "prop-types";

/*
*  onSort           const handleSort = item => setSortBy(item)
*  selectedSort     {path: 'profession.name', order: 'asc'} // desc
*  columns          = {
                    name: {path: 'name', name: 'Имя'},
                    qualities: {name: 'Качества', component: (user) => (<QualitiesList qualities={user.qualities}/>)},
                    professions: {path: 'profession.name', name: 'Профессия'},
                    }
*/
function TableHeader({onSort, selectedSort, columns}) {
    console.log("selectedSort", selectedSort)
    console.log("columns", columns)
    console.log("onSort", onSort)
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === 'asc' ? 'desc' : 'asc'
            })
        } else {
            onSort({path: item, order: 'asc'})
        }
    }

    const caret = selectedSort.order === 'asc'
        ? <i className="bi bi-caret-up-fill"></i>
        : <i className="bi bi-caret-down-fill"></i>

    return (
        <thead>
        <tr>
            {Object.keys(columns).map((column) => (
                <th
                    key={column}
                    onClick={
                        columns[column].path
                            ? () => handleSort(columns[column].path)
                            : undefined
                    }
                    {...{role: columns[column].path && 'button'}}
                    scope="col"
                >
                    {columns[column].name}
                    {selectedSort.path === columns[column].path && caret}
                </th>

            ))}
            <th/>
        </tr>
        </thead>
    );
}

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
}

export default TableHeader;