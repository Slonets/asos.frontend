import "./style/change_style.css";
import {ChangeEventHandler, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import * as yup from "yup";
import {useFormik} from "formik";
import {IRegisterError} from "../../components/authentication/register/type.ts";
import http from "../../http_common.ts";
import axios from "axios";
import {IUser} from "../../components/authentication/login/type.ts";
import {APP_ENV} from "../../env";
import {AuthUserActionType} from "../../components/authentication/type.ts";
// import {useNavigate} from "react-router-dom";



const ChangeUserProfile = () => {

    const baseUrl = APP_ENV.BASE_URL;

    // const navigate = useNavigate();

    const dispatch = useDispatch();

    const init: IUser =
        {
            id: 0,
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            image: "",
            roles: "",
        }

    const currentUser = useSelector((state: RootState) => state.auth.user);

    const [user, setUser] = useState<IUser>(init);

    const [error, setError] = useState<IRegisterError>();

    useEffect(() => {

        if (currentUser)
        {
            setUser(currentUser);
        }

    }, [currentUser]);


    //Схема валідації даних полів IChangeUser
    const changeSchema = yup.object({
        email: yup.string()
            .email("Введіть коректно пошту"),
        firstName: yup.string()
            .min(2, "Ім'я повинно містити мінімум 2 символи")
            .max(20, "Ім'я повинно містити не більше 20 символів"),
        lastName: yup.string()
            .min(2, "Прізвище повинно містити мінімум 2 символи")
            .max(20, "Прізвище повинно містити не більше 20 символів")
    });

    const onFormikSubmit=async (values: IUser) => {

        console.log("Відправляємо на сервер", values);
        try
        {
            const result = await http.put("api/Account/edit-user", values
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                   }
                );
            console.log("Result server good", result);

            dispatch({
                type: AuthUserActionType.UPDATE_USER,
                payload: {
                    image: values.image,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phoneNumber: values.phoneNumber
                }
            });


        }
        catch(error)
        {
            if (axios.isAxiosError(error))
            {
                setError(error.request);
            }
        }

        // navigate(0);
    }

    //спеціальний хук для валідації. Працює з обєктом init
    const formik = useFormik({
        initialValues: init,
        onSubmit: onFormikSubmit,
        validationSchema: changeSchema
    });

    //Функція перевіряє чи це файл
    const beforeUpload = (file: File) => {
        const isImage = /^image\/\w+/.test(file.type);
        if (!isImage)
        {
            console.log('Оберіть файл зображення!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M)
        {
            console.log('Розмір файлу не повинен перевищувать 10MB!');
        }
        console.log("is select", isImage && isLt2M);
        return isImage && isLt2M;
    };

    const handleChangeImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const files = e.target.files;

        if (!files || files.length === 0)
        {
            return;
        }
        const file = files[0];

        if (!beforeUpload(file))
        {
            return;
        }

        try {

            const resp = await http.post(`api/uploadAvatar/UpdateAvatar`, {Image: file}, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const newImage = resp.data;

            dispatch({
                type: AuthUserActionType.UPDATE_USER,
                payload: {
                    image:newImage
                }
            });

            console.log("Прийшло фото", resp.data);

        }
        catch (error)
        {
            console.error('Помилка з фото User:', error);
        }
    };

    const { values, touched, errors, handleSubmit, handleChange, setFieldValue} = formik;

    useEffect(() => {

        if (currentUser)
        {
            // setUser(currentUser);
            setFieldValue("id", currentUser.id);
            setFieldValue("firstName", currentUser.firstName);
            setFieldValue("lastName", currentUser.lastName);
            setFieldValue("email", currentUser.email);
            setFieldValue("phoneNumber", currentUser. phoneNumber);
            setFieldValue("image", currentUser. image);
            setFieldValue("role", currentUser. roles);
        }

    }, [currentUser]);

    return (
        <>
            <div className="containerChange">
                <div className="photo-container" >

                    <label htmlFor={"pickFoto"} >
                    <img

                        src={
                            user.image
                                ? `${baseUrl}avatars/${user.image}`
                                : `${baseUrl}avatars/user404.png`
                        }
                        alt={`${user.firstName} ${user.lastName}`}
                        className="image"
                        style={{ cursor: "pointer" }}
                    />
                    </label>

                    <input
                        id="pickFoto"
                        accept="image/*"
                        type="file"
                        name="image"
                        onChange={handleChangeImage}
                        className="file-input"
                        style={{ display: 'none' }} // Приховуємо вхідний файл
                    />
                </div>


                <form onSubmit={handleSubmit} className="form">
                    <div className="input-group">
                        <label className="label">Ім'я:</label>
                        <input
                            className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.firstName && (errors.firstName || error?.firstName) ? 'border-red-500' : 'border-gray-300'}`}
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                        />
                        {(touched.firstName && errors.firstName) || error?.firstName ? <div className="text-red-500 text-xs mt-1">{errors.firstName || error?.firstName}</div> : null}
                    </div>
                    <div className="input-group">
                        <label className="label">Прізвище:</label>
                        <input
                            className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.lastName && (errors.lastName || error?.lastName) ? 'border-red-500' : 'border-gray-300'}`}
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                        />
                        {(touched.lastName && errors.lastName) || error?.lastName ? <div className="text-red-500 text-xs mt-1">{errors.lastName || error?.lastName}</div> : null}
                    </div>
                    <div className="input-group">
                        <label className="label">Email:</label>
                        <input
                            className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.email && (errors.email || error?.email) ? 'border-red-500' : 'border-gray-300'}`}

                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        {(touched.email && errors.email) || error?.email ? <div className="text-red-500 text-xs mt-1">{errors.email || error?.email}</div> : null}
                    </div>
                    <div className="input-group">
                        <label className="label">Телефон</label>
                        <input
                            className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.phoneNumber && (errors.phoneNumber || error?.phoneNumber) ? 'border-red-500' : 'border-gray-300'}`}
                            type="text"
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                        />
                        {(touched.phoneNumber && errors.phoneNumber) || error?.phoneNumber ? <div className="text-red-500 text-xs mt-1">{errors.phoneNumber || error?.phoneNumber}</div> : null}
                    </div>
                    <button type="submit" className="button">Змінити</button>
                </form>

                {/*    <form onSubmit={handlePasswordSubmit} className="form">*/}
                {/*        <div className="input-group">*/}
                {/*            <label className="label">Новий пароль:</label>*/}
                {/*            <input*/}
                {/*                type="password"*/}
                {/*                name="newPassword"*/}
                {/*                value={password.newPassword}*/}
                {/*                onChange={handlePasswordChange}*/}
                {/*                className="input"*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <div className="input-group">*/}
                {/*            <label className="label">Підтвердіть пароль:</label>*/}
                {/*            <input*/}
                {/*                type="password"*/}
                {/*                name="confirmPassword"*/}
                {/*                value={password.confirmPassword}*/}
                {/*                onChange={handlePasswordChange}*/}
                {/*                className="input"*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <button type="submit" className="button">Змінити пароль</button>*/}
                {/*    </form>*/}
            </div>
        </>
    )
};

export default ChangeUserProfile;