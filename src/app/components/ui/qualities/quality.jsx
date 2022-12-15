import React from "react";
import PropTypes from "prop-types";
import {useQualities} from "../../../hooks/useQualities";

const Quality = ({_id}) => {
    const {getQualities} = useQualities()
    const {color, name} = getQualities(_id)
    return (
        <span className={"badge m-1 bg-" + color}>
            {name}
        </span>
    );
};
Quality.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default Quality;
