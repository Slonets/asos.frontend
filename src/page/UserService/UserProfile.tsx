import "./style/user_profile_style.css";
import {IUser} from "../../components/authentication/login/type.ts";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {APP_ENV} from "../../env";

const UserProfile = () => {

    const baseUrl = APP_ENV.BASE_URL;

    const init: IUser = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        image: "",
        roles: "",
        IsLockedOut:false
    };

    const [info, setInfo] = useState<IUser>(init);

// Отримання даних з Redux store
    const user = useSelector((state: RootState) => state.auth.user);

    // Оновлення локального стану, коли змінюються дані з Redux
    useEffect(() =>
    {
        if (user)
        {
            setInfo(user);
        }
    }, [user]);

    return (
        <>
            {info ? (
            <div className="create">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Ім'я</td>
                        <td className="px-6 py-4 whitespace-nowrap">{info.firstName}</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Прізвище</td>
                        <td className="px-6 py-4 whitespace-nowrap">{info.lastName}</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Email</td>
                        <td className="px-6 py-4 whitespace-nowrap">{info.email}</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Телефон</td>
                        <td className="px-6 py-4 whitespace-nowrap">{info.phoneNumber}</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Роль</td>
                        <td className="px-6 py-4 whitespace-nowrap">{info.roles}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="relative">
                    <div id="tooltip-bonnie" role="tooltip"
                         className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0">
                        {info.firstName} {info.lastName}
                        <div className="tooltip-arrow"></div>
                    </div>
                    <img
                        data-tooltip-target="tooltip-bonnie"
                        className="foto"

                        src={
                            info.image
                                ? `${baseUrl}avatars/${info.image}`
                                : `${baseUrl}avatars/user404.png`
                        }
                        alt="User avatar"
                    />
                </div>
            </div>
            ) : (
                <h1>Вам потрібно авторизуватися</h1>
            )}
        </>
    )
};

export default UserProfile;