// import {IRegisterPage} from "./type.ts";
// import {BiLogoFacebook} from "react-icons/bi";
// import {ChangeEventHandler, useState} from "react";
// import http from "../../../http_common.ts";
// import * as yup from "yup";
// import {useFormik} from "formik";
// import axios from "axios";
// import {APP_ENV} from "../../../env";
//
//
// const RegisterPage = () => {
//
//     const baseUrl = APP_ENV.BASE_URL;
//
//     const init: IRegisterPage = {
//         firstName: "",
//         lastName: "",
//         phoneNumber: "",
//         email: "",
//         image: "",
//         password: ""
//     };
//     const [error, setError] = useState<IRegisterError>();
//
// //Функція перевіряє чи це файл
//     const beforeUpload = (file: File) => {
//         const isImage = /^image\/\w+/.test(file.type);
//         if (!isImage) {
//             console.log('Оберіть файл зображення!');
//         }
//         const isLt2M = file.size / 1024 / 1024 < 10;
//         if (!isLt2M) {
//             console.log('Розмір файлу не повинен перевищувать 10MB!');
//         }
//         console.log("is select", isImage && isLt2M);
//         return isImage && isLt2M;
//     };
//
//     const [UserImage, setUserImage] = useState<string>();
//     const handleChangeImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
//         const files = e.target.files;
//
//         if (!files || files.length === 0) {
//             return;
//         }
//         const file = files[0];
//
//         if (!beforeUpload(file)) {
//             return;
//         }
//
//         try {
//
//             const resp = await http.post(`api/UploadAvatar/CreateAvatar`, {Image: file}, {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 }
//             });
//
//             setUserImage(resp.data);
//             console.log("Прийшло фото", resp.data);
//
//         } catch (error) {
//             console.error('Помилка з фото User:', error);
//         }
//     };
//
//     const onFormikSubmit = async (values: IRegisterPage) => {
//
//         values.image = UserImage || "";
//
//         console.log("Відправляємо на сервер", values);
//         try {
//             const result = await http.post("api/Account/register", values
//                 , {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 }
//             );
//             console.log("Result server good", result);
//
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 if (error.response) {
//                     const message = error.response.data as IRegisterError;
//                     setFieldError("email", message.email);
//                     return;
//                 }
//                 setError(error.request);
//             }
//         }
//     }
//
//     //Схема валідації даних полів IRegisterPage
//     const registerSchema = yup.object({
//         email: yup.string()
//             .required("Вкажіть пошту")
//             .email("Введіть коректно пошту"),
//         firstName: yup.string().required("Вкажіть ім'я"),
//         lastName: yup.string().required("Вкажіть прізвище"),
//         phoneNumber: yup.string().required("Вкажіть телефон"),
//         password: yup
//             .string()
//             .min(5, "Пароль повинен містити мінімум 5 символів")
//             .matches(/[0-9a-zA-Z]/, "Пароль може містить латинські символи і цифри")
//             .required("Поле не повинне бути пустим")
//     });
//
//     //спеціальний хук для валідації. Працює з обєктом init
//     const formik = useFormik({
//         initialValues: init,
//         onSubmit: onFormikSubmit,
//         validationSchema: registerSchema
//     });
//
//     // handleSubmit метод, що направляє дані після натиснення button
//     //handleChange метод, який міняє значення імпутів
//     //errors обєкт з formik, який містить помилки
//     //setFieldValue для того, щоб записати значення у formik, але для фото
//     const {values, touched, errors, handleSubmit, handleChange, setFieldError} = formik;
//
//
//     return (
//         <>
//
//             <div className="md:w-1/3 max-w-sm">
//
//                 <div
//                     id="FileUpload"
//                     className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
//                 >
//                     <input
//                         onChange={handleChangeImage}
//                         type="file"
//                         accept="image/*"
//                         className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
//                     />
//                     <div className="flex flex-col items-center justify-center space-y-3">
//                     <span
//                         className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
//                       <svg
//                           width="16"
//                           height="16"
//                           viewBox="0 0 16 16"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                             fillRule="evenodd"
//                             clipRule="evenodd"
//                             d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
//                             fill="#3C50E0"
//                         />
//                         <path
//                             fillRule="evenodd"
//                             clipRule="evenodd"
//                             d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
//                             fill="#3C50E0"
//                         />
//                         <path
//                             fillRule="evenodd"
//                             clipRule="evenodd"
//                             d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
//                             fill="#3C50E0"
//                         />
//                       </svg>
//                     </span>
//                         <p>
//                             <span className="text-primary">Click to upload</span> or
//                             drag and drop
//                         </p>
//                         <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
//                         <p>(max, 800 X 800px)</p>
//                     </div>
//                 </div>
//
//                 <div className="h-14 w-14 rounded-full">
//
//                     {UserImage ? (
//                         <img src={`${baseUrl}avatars/${UserImage}`} alt="User" className="rounded-full"/>
//
//                     ) : (
//                         <img src={`${baseUrl}avatars/user404.png`} alt="User" className="rounded-full"/>
//                     )}
//                 </div>
//
//             </div>
//
//             <div>
//
//
//                 <section
//                     className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
//                     <form onSubmit={handleSubmit}>
//                         <div className="text-center md:text-left">
//                             <label className="mr-1">Реєстрація</label>
//                             <button type="button"
//                                     className="mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]">
//                                 <BiLogoFacebook size={20} className="flex justify-center items-center w-full"/>
//                             </button>
//                         </div>
//                         <div
//                             className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
//                             <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
//                                 Or
//                             </p>
//                         </div>
//
//                         <input
//                             className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.firstName && (errors.firstName || error?.firstName) ? 'border-red-500' : 'border-gray-300'}`}
//                             type="text"
//                             placeholder="Ім'я"
//                             value={values.firstName}
//                             name="firstName"
//                             onChange={handleChange}
//                         />
//                         {(touched.firstName && errors.firstName) || error?.firstName ? <div
//                             className="text-red-500 text-xs mt-1">{errors.firstName || error?.firstName}</div> : null}
//
//                         <input
//                             className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.lastName && (errors.lastName || error?.lastName) ? 'border-red-500' : 'border-gray-300'}`}
//                             type="text"
//                             placeholder="Прізвище"
//                             value={values.lastName}
//                             name="lastName"
//                             onChange={handleChange}
//                         />
//                         {(touched.lastName && errors.lastName) || error?.lastName ? <div
//                             className="text-red-500 text-xs mt-1">{errors.lastName || error?.lastName}</div> : null}
//
//                         <input
//                             className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.phoneNumber && (errors.phoneNumber || error?.phoneNumber) ? 'border-red-500' : 'border-gray-300'}`}
//                             type="text" // Змінено з number на text
//                             placeholder="Телефон"
//                             value={values.phoneNumber}
//                             name="phoneNumber"
//                             onChange={handleChange}
//                         />
//                         {(touched.phoneNumber && errors.phoneNumber) || error?.phoneNumber ? <div
//                             className="text-red-500 text-xs mt-1">{errors.phoneNumber || error?.phoneNumber}</div> : null}
//
//                         <input
//                             className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.email && (errors.email || error?.email) ? 'border-red-500' : 'border-gray-300'}`}
//                             type="text"
//                             placeholder="Email"
//                             value={values.email}
//                             name="email"
//                             onChange={handleChange}
//                         />
//                         {(touched.email && errors.email) || error?.email ?
//                             <div className="text-red-500 text-xs mt-1">{errors.email || error?.email}</div> : null}
//
//                         <input
//                             className={`text-sm w-full px-4 py-2 border border-solid rounded ${touched.password && (errors.password || error?.password) ? 'border-red-500' : 'border-gray-300'}`}
//                             type="password"
//                             placeholder="Пароль"
//                             value={values.password}
//                             name="password"
//                             onChange={handleChange}
//                         />
//                         {(touched.password && errors.password) || error?.password ? <div
//                             className="text-red-500 text-xs mt-1">{errors.password || error?.password}</div> : null}
//
//
//                         <div className="text-center md:text-left">
//                             <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
//                                 Зареєструватись
//                             </button>
//                         </div>
//
//                     </form>
//
//                 </section>
//             </div>
//         </>
//
//     )
// }
//
// export default RegisterPage;