import React from 'react';
import PropTypes from "prop-types";

function Search({onChange}) {
    return (
        <div>
            <input
                placeholder="Search... "
                type="text"
                onChange={onChange}
            />
        </div>
    );
}

Search.propTypes = {
    onChange: PropTypes.func.isRequired,
}

export default Search;