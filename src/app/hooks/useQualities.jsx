import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {toast} from "react-toastify";
import ProfessionService from "../services/profession.service";
import {professions} from "../api/fake.api/professions.api";

const QualitiesContext = React.createContext()

export const QualitiesProvider = ({children}) => {
    const [isLoading, setLoading] = useState(true)
    const [qualities, setQualities] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getQualitiesList();
    }, [])

    function errorCatcher(error) {
        const {message} = error.response.data;
        setError(message)
    }

    function getProfession(id) {
        return professions.find((p) => p._id === id)
    }

    async function getQualitiesList() {
        try {
            const {content} = await ProfessionService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <QualitiesContext.Provider
            value={{ isLoading, professions, getProfession }}>
            12345
            {children}
        </QualitiesContext.Provider>
    );
}

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
