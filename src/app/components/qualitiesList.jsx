import React from 'react';
import Quality from "./quality";
import PropTypes from "prop-types";

function QualitiesList({qualities}) {
    return (
        <>
            {qualities.map((item) => <Quality {...item} key={item._id}/>)}
        </>
    );
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired,
}

export default QualitiesList;