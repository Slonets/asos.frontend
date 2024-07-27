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

const EditDetails = () => {

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
    };

    const currentUser = useSelector((state: RootState) => state.auth.user);

    const [user, setUser] = useState<IUser>(init);

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
            console.log("Прийшов user", user);
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
            console.log("Result server good", result);

            dispatch({
                type: AuthUserActionType.UPDATE_USER,
                payload: {
                    image: values.image,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                },
            });
        } catch (error) {
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
        if (currentUser) {
            setFieldValue("id", currentUser.id);
            setFieldValue("firstName", currentUser.firstName);
            setFieldValue("lastName", currentUser.lastName);
            setFieldValue("email", currentUser.email);
            setFieldValue("phoneNumber", currentUser.phoneNumber);
            setFieldValue("image", currentUser.image);
            setFieldValue("roles", currentUser.roles);
        }
    }, [currentUser, setFieldValue]);


    // const dataPassword: IChangePassword =
    //     {
    //         currentPassword: "",
    //         newPassword: "",
    //     }
    // const [Currentpassword, setPassword] = useState<IChangePassword>(dataPassword);
    //
    //
    // const [passwordError, setPasswordError] = useState("");
    // const handlePasswordSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //
    //     try {
    //
    //         const result = await http.post("api/Account/change-password", {
    //             newPassword: Currentpassword.newPassword,
    //             currentPassword: Currentpassword.currentPassword
    //         }, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data"
    //             }
    //         })
    //
    //         console.log("Пароль змінено успішно", result);
    //
    //     } catch (error) {
    //         console.error('Помилка зміни паролю:', error);
    //
    //         if (axios.isAxiosError(error)) {
    //             setPasswordError(error.response?.data?.message || 'Помилка зміни паролю');
    //         }
    //     }
    // };
    //
    // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassword({...Currentpassword, [e.target.name]: e.target.value});
    //     setPasswordError("");
    // };
    //
    //


return (
        <>
            <div className="centered-div">
                <ProfileDefaultHeader/>
            </div>

            <div className="main-container">
                <DefaultSideBar/>
                <div className="content-container">
                    <div className="div-with-text">
                        <h2>Edit Details</h2>
                        <p>
                            You can edit any of your details below so<br/>
                            your account info is as fresh as your looks!
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
                                    <label className="blue-text label">Email:</label>
                                    <input
                                        className={`input ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    {touched.email && errors.email ? (
                                        <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="input-group">
                                    <label className="blue-text label">Phone Number:</label>
                                    <input
                                        className={`input ${touched.phoneNumber && errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                                        type="text"
                                        name="phoneNumber"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                    />
                                    {touched.phoneNumber && errors.phoneNumber ? (
                                        <div className="text-red-500 text-xs mt-1">{errors.phoneNumber}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="form-row button-container">
                                <button type="submit" className="button save-button">Save changes</button>
                            </div>
                        </form>

                        {/*<div className="form-row">*/}
                        {/*    <div className="input-group">*/}
                        {/*        <label className="blue-text label">Current Password:</label>*/}
                        {/*        <input*/}
                        {/*            type="password"*/}
                        {/*            name="currentPassword"*/}
                        {/*            value={Currentpassword.currentPassword}*/}
                        {/*            onChange={handlePasswordChange}*/}
                        {/*            className="input"*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <div className="input-group">*/}
                        {/*        <label className="blue-text label">Change Password:</label>*/}
                        {/*        <input*/}
                        {/*            type="password"*/}
                        {/*            name="newPassword"*/}
                        {/*            value={Currentpassword.newPassword}*/}
                        {/*            onChange={handlePasswordChange}*/}
                        {/*            className="input"*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*{passwordError && <div className="text-red-500 text-xs mt-1">{passwordError}</div>}*/}
                        {/*<div className="form-row button-container">*/}
                        {/*    <button type="submit" className="button save-button">Save changes</button>*/}
                        {/*</div>                        */}

                    </div>
                </div>
            </div>
        </>
    );
};

export default EditDetails;
