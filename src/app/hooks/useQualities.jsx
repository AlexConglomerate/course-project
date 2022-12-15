import React, {useContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {toast} from "react-toastify";
import QualitiesService from "../services/qualities.servise";

const QualitiesContext = React.createContext()
export const useQualities = () => useContext(QualitiesContext)

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

    const getQualities = (id) => qualities.find(p => p._id === id)

    console.log(getQualities(`6399c267f62bc5af8df86c24`))


    async function getQualitiesList() {
        try {
            const {content} = await QualitiesService.get();
            console.log('content', content)
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <QualitiesContext.Provider
            value={{isLoading, qualities, getQualities}}>
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
