import React from 'react';
import PropTypes from "prop-types";

function Search({onChange, value}) {
    return (
        <div>
            <input
                className="form-control"
                placeholder="Search..."
                type="text"
                onChange={onChange}
                value={value}
            />
        </div>
    );
}

Search.propTypes =
    {
        onChange: PropTypes.func.isRequired,
    }

export default Search;