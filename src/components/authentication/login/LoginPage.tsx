import {ILoginPage, ILoginPageError, IUser} from "./type.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import http from "../../../http_common.ts";

import { BiLogoFacebook } from "react-icons/bi";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "../../../helpers/setAuthToken.ts";
import {useGoogleLoginMutation} from "../../../services/user.ts";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import {useAppDispatch} from "../../../store";
import {setCredentials} from "../../../store/slice/userSlice.ts";
import {jwtParser} from "../../../utils/jwtParser.ts";
import {User} from "../../../interfaces/user";
import {useLocation, useNavigate} from "react-router-dom";


const LoginPage = () => {

    //створили конкретни екземлеяр на основі нашого інтерфейсу
    const init: ILoginPage = {
        email: "",
        password: ""
    };
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [googleLogin] = useGoogleLoginMutation();

    const authSuccess = async (credentialResponse: CredentialResponse) => {
        const res = await googleLogin({
            credential: credentialResponse.credential || "",
        });

        if (res && "data" in res && res.data) {
            localStorage.setItem("authToken", res.data.token);
            console.log(res.data.token);

            dispatch(
                setCredentials({
                    user: jwtParser(res.data.token) as User,
                    token: res.data.token,
                }),
            );
            const { from } = location.state || { from: { pathname: "/" } };
            navigate(from);
        } else {
            console.log("Error login. Check login data!");
        }
    };
    const authError = () => {
        console.log("Error login.");
    };

    //При зміни значення елемента в useState компонент рендериться повторно і виводить нові значення
    const [data, setData] = useState<ILoginPage>(init);

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // console.log("Приходять дані", data);
        http.post("api/account/login", data)
            .then(resp =>
            {
                const token =resp.data.token as string;

                setAuthToken(token);

                const user = jwtDecode<IUser>(token);
                console.log("Вхід успішний", user);

            })
            .catch(badReqeust=>{

                const errors=badReqeust.response.data.errors as ILoginPageError;
                console.log("Помилки", errors);
            });
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    return (
        <>

            <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
                <form onSubmit={onSubmitHandler}>
                <div className="md:w-1/3 max-w-sm">
                    <div className="text-center md:text-left">
                        <label className="mr-1">Sign in with</label>
                        <button
                            type="button"
                            className="mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
                        >
                            <BiLogoFacebook
                                size={20}
                                className="flex justify-center items-center w-full"
                            />
                        </button>
                        <div className="flex justify-center items-center">


                            <GoogleLogin
                                useOneTap
                                locale="uk"
                                size="large"
                                onSuccess={authSuccess}
                                onError={authError}
                            />
                        </div>
                    </div>
                    <div
                        className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                            Or
                        </p>
                    </div>
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                        type="text"
                        placeholder="Email Address"
                        value={data.email}
                        name={"email"}
                        onChange={onChangeHandler}
                    />
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                        type="password"
                        placeholder="Password"
                        value={data.password}
                        name={"password"}
                        onChange={onChangeHandler}
                    />
                    <div className="mt-4 flex justify-between font-semibold text-sm">
                        <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                            <input className="mr-1" type="checkbox" />
                            <span>Remember Me</span>
                        </label>
                        <a
                            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                            href="#"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div className="text-center md:text-left">
                        <button
                            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                    <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                        Don&apos;t have an account?{" "}
                        <a
                            className="text-red-600 hover:underline hover:underline-offset-4"
                            href="#"
                        >
                            Register
                        </a>
                    </div>
                </div>
                </form>
            </section>

        </>
    )
}
export default LoginPage;