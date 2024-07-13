import {ILoginPage, ILoginPageError, IUser} from "./type.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import http from "../../../http_common.ts";

import setAuthToken from "../../../helpers/setAuthToken.ts";
import {useAppDispatch} from "../../../store";
import {useNavigate} from "react-router-dom";
import {AuthUserActionType} from "../type.ts";
import {jwtDecode} from "jwt-decode";
import "./style.css";
import axios from "axios";


const LoginPage = () => {

    //створили конкретний екземлеяр на основі нашого інтерфейсу
    const init: ILoginPage = {
        email: "",
        password: ""
    };

    const respons: ILoginPageError = {
        error:"",
    };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    //При зміни значення елемента в useState компонент рендериться повторно і виводить нові значення
    const [data, setData] = useState<ILoginPage>(init);
    const [mistake, setMistake]= useState<ILoginPageError>(respons);

        const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // console.log("Приходять дані", data);
        http.post("api/account/login", data)
            .then(resp => {
                const token = resp.data.token as string;

                setAuthToken(token);

                const user = jwtDecode<IUser>(token);

                console.log("Вхід успішний", user);

                dispatch({type: AuthUserActionType.LOGIN_USER, payload: user});

                navigate("/");

            })
            .catch(badReqeust => {

                if (axios.isAxiosError(badReqeust))
                {
                    if (badReqeust.response)
                    {
                        const errorData = badReqeust.response.data;

                        // Перевірка, чи це рядок
                        let errorMessage = "";

                        if (typeof errorData === 'string') {
                            // Якщо це рядок, ми можемо безпосередньо працювати з ним
                            errorMessage = errorData;
                        } else if (errorData.message)
                        {
                            // Якщо це об'єкт з полем message
                            errorMessage = errorData.message;
                        }

                        console.log("Таке прийшло", errorMessage);


                            // Знайшли відповідну помилку, виводимо її у span
                            const spanElement = document.getElementById("errorSpan");

                            if (spanElement)
                            {
                                spanElement.textContent = mistake.error; // встановлюємо текст повідомлення
                            }
                        }
                    }
            });
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const togglePasswordVisibility = () => {

        const passwordInput = document.querySelector('.Input-Password');

        if (passwordInput && passwordInput instanceof HTMLInputElement) {  // Перевірка на null і правильний тип елемента
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        }
    };

    return (
        <>
            <div className="orLogInwithEmail">

                <span className="orLogInwithEmail-text">or Log In with Email</span>

            </div>

            <form onSubmit={onSubmitHandler}>

                <div className="Frame25">

                    <div className="Frame11">

                        <label className="Label-Email">Email</label>

                        <input className="Input-Email"
                               type="text"
                               placeholder="Email Address"
                               value={data.email}
                               name={"email"}
                               onChange={onChangeHandler}
                        />

                    </div>

                    <div className="Frame24">

                        <div className="Frame16">

                            <label className="Label-Password">Password</label>

                            <input
                                className="Input-Password"
                                type="password"
                                value={data.password}
                                name={"password"}
                                onChange={onChangeHandler}
                            />

                            <div className="Frame15">

                                <div className="ForgotPassword-Div">

                                    <button className="ForgotPassword-Button">Forgot your password?</button>

                                </div>

                            </div>

                        </div>

                        {mistake && (
                            <div className="error">
                                <span id="errorSpan"></span>
                            </div>
                        )}

                        <div  className="Frame23">

                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer"/>
                                <div id="my" className="absolute w-30 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 toggle-span">Remember me</span>
                            </label>

                        </div>

                    </div>

                </div>

                <div className="Button_action-Div">

                    <button className="Button_Login">Log In</button>
                </div>

            </form>

            <button onClick={togglePasswordVisibility} className="EyeVisibility">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path
                        d="M1 12.5C1 12.5 5 4.5 12 4.5C19 4.5 23 12.5 23 12.5C23 12.5 19 20.5 12 20.5C5 20.5 1 12.5 1 12.5Z"
                        stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path
                        d="M12 15.5C13.6569 15.5 15 14.1569 15 12.5C15 10.8431 13.6569 9.5 12 9.5C10.3431 9.5 9 10.8431 9 12.5C9 14.1569 10.3431 15.5 12 15.5Z"
                        stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>


        </>
    )
}
export default LoginPage;