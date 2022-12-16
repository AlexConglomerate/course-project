import React, {useEffect, useState} from "react";
import {validator} from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import axios from "axios";
import {setTokens} from "../../services/localStorage.service";
import {useHistory} from "react-router-dom";

const LoginForm = () => {
    const history = useHistory()
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
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

    async function logIn({email, password}) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        const httpAuth = axios.create();
        try {
            const {data} = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data)
            history.push('/')
        } catch (error) {
            const {code, message} = error.response.data.error
            console.log(code, message)
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const error = errors
                    const errorObject = {
                        ...error,
                        email: "Пользователя с таким Email не существует"
                    }
                    setErrors(errorObject)
                }
                if (message === "INVALID_PASSWORD") {
                    const error = errors
                    const errorObject = {
                        ...error,
                        password: "Неправильный пароль"
                    }
                    setErrors(errorObject)
                }
            }
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return
        console.log(data)
        const aaa = await logIn(data)
        console.log(aaa)
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
