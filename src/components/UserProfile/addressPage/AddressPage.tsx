import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import * as yup from "yup";
import {useFormik} from "formik";
import http from "../../../http_common";
import "../Style-UserProfile.scss";
import ProfileDefaultHeader from "../default/ProfileDefaultHeader";
import DefaultSideBar from "../default/DefaultSideBar";
import {IUser} from "../../authentication/login/type.ts";
import {AuthUserActionType} from "../../authentication/type.ts";
import 'react-datepicker/dist/react-datepicker.css';
import setAuthToken from "../../../helpers/setAuthToken.ts";
import {jwtDecode} from "jwt-decode";

const AddressPage = () => {

    const dispatch = useDispatch();

    const init: IUser = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        image: "",
        roles: "",
        IsLockedOut: false,
        birthday:null,
    };

    const currentUser = useSelector((state: RootState) => state.auth.user);

    const [user, setUser] = useState<IUser>(init);


    useEffect(() => {
        if (currentUser)
        {
            setUser(currentUser);
            console.log("Прийшов такий user", user);



        }
    }, [currentUser]);

    const changeSchema = yup.object({
        email: yup.string().email("Введіть коректно пошту"),
        firstName: yup
            .string()
            .min(2, "Ім'я повинно містити мінімум 2 символи")
            .max(20, "Ім'я повинно містити не більше 20 символів"),
        lastName: yup
            .string()
            .min(2, "Прізвище повинно містити мінімум 2 символи")
            .max(20, "Прізвище повинно містити не більше 20 символів"),
    });

    const onFormikSubmit = async (values: IUser) => {


        console.log("Відправляємо на сервер", values);
        try {
            const result = await http.put("api/Account/edit-user", values, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });


            dispatch({
                type: AuthUserActionType.UPDATE_USER,
                payload: {
                    image: values.image,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    birthday: values.birthday
                },
            });

            const token = result.data.token as string;

            setAuthToken(token);

            const user = jwtDecode<IUser>(token);

            console.log("Оновлений користувач", user);

            dispatch({type: AuthUserActionType.LOGIN_USER, payload: user});
        }
        catch (error)
        {
            console.error("Помилка при відправці на сервер:", error);
        }
    };

    const formik = useFormik({
        initialValues: init,
        onSubmit: onFormikSubmit,
        validationSchema: changeSchema,
    });

    const {values, touched, errors, handleSubmit, handleChange, setFieldValue} = formik;

    useEffect(() => {

        if (currentUser)
        {
            setFieldValue("id", currentUser.id);
            setFieldValue("firstName", currentUser.firstName);
            setFieldValue("lastName", currentUser.lastName);
            setFieldValue("email", currentUser.email);
            setFieldValue("phoneNumber", values.phoneNumber);
            setFieldValue("image", values.image);
            setFieldValue("roles", currentUser.roles);
            setFieldValue('birthday', currentUser.birthday);
        }
    }, [currentUser, setFieldValue]);

    return (
        <>
            <div className="centered-div">
                <ProfileDefaultHeader/>
            </div>

            <div className="main-container">
                <DefaultSideBar/>
                <div className="content-container">
                    <div className="div-with-text">
                        <h2>Address Information</h2>
                        <p>
                            You`ve already saved the address. Make sure your details are valid.<br/>
                        </p>
                        <p className="blue-text">(*Indicates a required field).</p>
                    </div>

                    <div className="containerChange">
                        <form onSubmit={handleSubmit} className="form">
                            <div className="form-row">
                                <div className="input-group">
                                    <label className="blue-text label">First Name:</label>
                                    <input
                                        className={`input ${touched.firstName && errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                        type="text"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                    />
                                    {touched.firstName && errors.firstName ? (
                                        <div className="text-red-500 text-xs mt-1">{errors.firstName}</div>
                                    ) : null}
                                </div>
                                <div className="input-group">
                                    <label className="blue-text label">Last Name:</label>
                                    <input
                                        className={`input ${touched.lastName && errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                        type="text"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                    />
                                    {touched.lastName && errors.lastName ? (
                                        <div className="text-red-500 text-xs mt-1">{errors.lastName}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label className="blue-text label">Mobile:</label>
                                    <input
                                        className={`input ${touched.phoneNumber && errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                                        type="text"
                                        name="phoneNumber"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                    />
                                    {touched.email && errors.email ? (
                                        <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="input-group">
                                    <label className="blue-text label margin10 ">Country:</label>
                                    <input
                                        type="text"
                                        className="input border-gray-300 small"

                                    />
                                </div>
                                <div className="input-group">
                                    <label className="blue-text label margin10">City:</label>
                                    <input
                                        type="text"
                                        className="input border-gray-300 small"

                                    />
                                </div>


                            </div>


                            <div className="form-row">
                                <div className="input-group">
                                    <label className="blue-text label">Address:</label>
                                    <input
                                        className={`input 'border-red-500' : 'border-gray-300'}`}
                                        type="text"

                                    />
                                </div>
                                <div className="input-group">
                                    <label className="blue-text label">PostCode:</label>
                                    <input
                                        className={`input  'border-red-500' : 'border-gray-300'}`}
                                        type="text"
                                    />
                                </div>
                            </div>


                            <div className="form-row button-container">
                                <button type="submit" className="button save-button">Update</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>
    )
        ;
};

export default AddressPage;
