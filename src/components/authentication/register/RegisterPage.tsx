import {IRegisterError, IRegisterPage} from "./type.ts";
import {BiLogoFacebook} from "react-icons/bi";
import {useState} from "react";
import http from "../../../http_common.ts";
import * as yup from "yup";
import {useFormik} from "formik";

const RegisterPage = () => {

    const init: IRegisterPage = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const [error, setError] = useState<IRegisterError>();

    const onFormikSubmit=async (values: IRegisterPage) => {

        console.log("Відправляємо на сервер", values);
        try
        {
            const result = await http.post("api/Account/register", values
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log("Result server good", result);

        } catch(err: any)
        {
            const error = err.response.data.errors as IRegisterError;
            if(error.email)
            {
                setFieldError("email", error.email[0]);
                return;
            }
            setError(error);
            console.log("Bad request", err);
        }
    }

    //Схема валідації даних полів IRegisterPage
    const registerSchema = yup.object({
        email: yup.string()
            .required("Вкажіть пошту")
            .email("Введіть коректно пошту"),
        firstName: yup.string().required("Вкажіть ім'я"),
        lastName: yup.string().required("Вкажіть прізвище"),
        phoneNumber: yup.string().required("Вкажіть телефон"),
        password: yup
            .string()
            .min(5, "Пароль повинен містити мініму 5 символів")
            .matches(/[0-9a-zA-Z]/, "Пароль може містить латинські символи і цифри")
            .required("Поле не повинне бути пустим"),
        confirmPassword: yup
            .string()
            .min(5, "Пароль повинен містити мініму 5 символів")
            .oneOf([yup.ref("password")], () => "Паролі повинні співпадати")
            .required("Поле не повинне бути пустим"),
    });

    //спеціальний хук для валідації. Працює з обєктом init
    const formik = useFormik({
        initialValues: init,
        onSubmit: onFormikSubmit,
        validationSchema: registerSchema
    });

    // handleSubmit метод, що направляє дані після натиснення button
    //handleChange метод, який міняє значення імпутів
    //errors обєкт з formik, який містить помилки
    //setFieldValue для того, щоб записати значення у formik, але для фото
    const { values, touched, errors, handleSubmit, handleChange, setFieldError } = formik;


    return (
        <>
            <section
                className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
                <form onSubmit={handleSubmit}>
                    <div className="md:w-1/3 max-w-sm">
                        <div className="text-center md:text-left">
                            <label className="mr-1">Регістрація</label>
                            <button
                                type="button"
                                className="mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
                            >
                                <BiLogoFacebook
                                    size={20}
                                    className="flex justify-center items-center w-full"
                                />
                            </button>
                        </div>
                        <div
                            className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                            <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                                Or
                            </p>
                        </div>

                        <input
                            className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.firstName && errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                            type="text"
                            placeholder="Ім'я"
                            value={values.firstName}
                            name="firstName"
                            onChange={handleChange}
                        />
                        {touched.firstName && errors.firstName && <div className="text-red-500 text-xs mt-1">{errors.firstName}</div>}

                        <input
                            className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.lastName && errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                            type="text"
                            placeholder="Прізвище"
                            value={values.lastName}
                            name="lastName"
                            onChange={handleChange}
                        />
                        {touched.lastName && errors.lastName && <div className="text-red-500 text-xs mt-1">{errors.lastName}</div>}

                        <input
                            className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.phoneNumber && errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                            type="text" // Змінено з number на text
                            placeholder="Телефон"
                            value={values.phoneNumber}
                            name="phoneNumber"
                            onChange={handleChange}
                        />
                        {touched.phoneNumber && errors.phoneNumber && <div className="text-red-500 text-xs mt-1">{errors.phoneNumber}</div>}

                        <input
                            className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.email && (errors.email || error?.email) ? 'border-red-500' : 'border-gray-300'}`}
                            type="text"
                            placeholder="Email"
                            value={values.email}
                            name="email"
                            onChange={handleChange}
                        />
                        {touched.email && errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}

                        <input
                            className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.password && (errors.password || error?.password) ? 'border-red-500' : 'border-gray-300'}`}
                            type="password"
                            placeholder="Пароль"
                            value={values.password}
                            name="password"
                            onChange={handleChange}
                        />
                        {touched.password && errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}

                        <input
                            className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.confirmPassword && (errors.confirmPassword || error?.confirmPassword) ? 'border-red-500' : 'border-gray-300'}`}
                            type="password"
                            placeholder="Підтвердіть пароль"
                            value={values.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                        />
                        {touched.confirmPassword && errors.confirmPassword && <div className="text-red-500 text-xs mt-1">{errors.confirmPassword}</div>}

                        <div className="text-center md:text-left">
                            <button
                                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                                type="submit"
                            >
                                Реєстрація
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default RegisterPage;