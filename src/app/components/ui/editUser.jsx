import React, {useEffect, useState} from "react";
import {validator} from "../../utils/validator";
import MultiSelectField from "../common/form/multiSelectField";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radioField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import {useHistory} from "react-router-dom";

const EditUser = (props) => {
        const userId = props.props.match.params.userId
        const [data, setData] = useState();
        const history = useHistory()

        const handleClick = () => {
            const qualities = data.qualities.reduce((acc, item) => {
                acc.push({
                    _id: item.value,
                    name: item.label,
                    color: item.color,
                })
                return acc
            }, [])

            const profession = {
                "_id": data.profession,
                "name": professions.filter(item => item.value === data.profession).label,
            }

            const newData = {...data, qualities,profession};

            api.users.update(userId, newData)
            history.push(`/users/${userId}/`)
        }

        useEffect(() => {
            api.users.fetchAll().then((data) => {
                const user = data.filter(item => item._id === userId)[0]
                const qualities = user.qualities.reduce((acc, item) => {
                    acc.push({
                        value: item._id,
                        label: item.name,
                        color: item.color,
                    })
                    return acc
                }, [])

                user.email = user.email
                user.name = user.name

                user.profession = user.profession._id
                user.sex = user.sex
                user.qualities = qualities
                console.log('start', data)
                setData(user)
            })
        }, []);


        const [qualities, setQualities] = useState([]);
        const [professions, setProfession] = useState([]);
        const [errors, setErrors] = useState({});

        const getProfessionById = (id) => {
            for (const prof of professions) {
                if (prof.value === id) {
                    return {_id: prof.value, name: prof.label};
                }
            }
        };
        const getQualities = (elements) => {
            const qualitiesArray = [];
            for (const elem of elements) {
                for (const quality in qualities) {
                    if (elem.value === qualities[quality].value) {
                        qualitiesArray.push({
                            _id: qualities[quality].value,
                            name: qualities[quality].label,
                            color: qualities[quality].color
                        });
                    }
                }
            }
            return qualitiesArray;
        };

        useEffect(() => {
            api.professions.fetchAll().then((data) => {
                const professionsList = Object.keys(data).map((professionName) => ({
                    label: data[professionName].name,
                    value: data[professionName]._id
                }));
                setProfession(professionsList);
            });
            api.qualities.fetchAll().then((data) => {
                const qualitiesList = Object.keys(data).map((optionName) => ({
                    value: data[optionName]._id,
                    label: data[optionName].name,
                    color: data[optionName].color
                }));
                setQualities(qualitiesList);
            });
        }, []);
        const handleChange = (target) => {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        };
        const validatorConfig = {
            email: {
                isRequired: {
                    message: "Электронная почта обязательна для заполнения"
                },
                isEmail: {
                    message: "Email введен некорректно"
                }
            },
            password: {
                isRequired: {
                    message: "Пароль обязателен для заполнения"
                },
                isCapitalSymbol: {
                    message: "Пароль должен содержать хотя бы одну заглавную букву"
                },
                isContainDigit: {
                    message: "Пароль должен содержать хотя бы одно число"
                },
                min: {
                    message: "Пароль должен состоять минимум из 8 символов",
                    value: 8
                }
            },
            profession: {
                isRequired: {
                    message: "Обязательно выберите вашу профессию"
                }
            },
            licence: {
                isRequired: {
                    message:
                        "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
                }
            }
        };
        useEffect(() => {
            validate();
        }, [data]);
        const validate = () => {
            const errors = validator(data, validatorConfig);
            setErrors(errors);
            return Object.keys(errors).length === 0;
        };
        const isValid = Object.keys(errors).length === 0;

        const handleSubmit = (e) => {
            e.preventDefault();
            const isValid = validate();
            if (!isValid) return;
            const {profession, qualities} = data;
            console.log({
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            });
        };

        if (!data) return 'Loading...'
        return (
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />

                <TextField
                    label="Электронная почта"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />

                <SelectField
                    label="Выбери свою профессию"
                    defaultOption="Choose..."
                    options={professions}
                    name="profession"
                    onChange={handleChange}
                    value={data.profession}
                    error={errors.profession}
                />
                <RadioField
                    options={[
                        {name: "Male", value: "male"},
                        {name: "Female", value: "female"},
                        {name: "Other", value: "other"}
                    ]}
                    value={data.sex}
                    name="sex"
                    onChange={handleChange}
                    label="Выберите ваш пол"
                />
                <MultiSelectField
                    options={qualities}
                    onChange={handleChange}
                    defaultValue={data.qualities}
                    name="qualities"
                    label="Выберите ваши качества"
                />

                <button
                    className="btn btn-primary w-100 mx-auto"
                    type="submit"
                    disabled={!isValid}
                    onClick={handleClick}
                >
                    Обновить
                </button>
            </form>
        );
    }
;

export default EditUser;
