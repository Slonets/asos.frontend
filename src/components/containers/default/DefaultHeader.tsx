import "./header-style.css";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {FormEvent, useState} from "react";
const DefaultHeader = () => {

    const userState = useSelector((state: RootState) => state.auth.isAuth);
    const user = useSelector((state: RootState) => state.auth.user);
    const isAdmin  = user?.roles === "Admin";
    const favorite = useSelector((state:RootState)=>state.favorite);
    const basketCount = useSelector((state:RootState) => state.basket);

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Переходимо на сторінку з результатами пошуку з передачею параметра в URL
        navigate(`/search-results?query=${query}`);
    };

    return (
        <>
            <section className="basic-container">

                <div className="header-container">

                    <div className="Frame193">

                        <Link to="/" className="Simply-Button">

                        <svg xmlns="http://www.w3.org/2000/svg" width="124" height="20" viewBox="0 0 124 20"
                             fill="none">
                            <path
                                d="M1.61999 18.2338C0.539994 17.2099 0 15.8372 0 14.1159C0 13.9 0.0168729 13.579 0.0506229 13.1473L1.50187 1.03688C1.51875 0.948318 1.55812 0.870829 1.61999 0.809945C1.68187 0.749061 1.75499 0.715851 1.83937 0.715851H5.41687C5.50124 0.715851 5.57438 0.749061 5.625 0.809945C5.67562 0.870829 5.6925 0.948318 5.67562 1.03688L4.22437 13.1473C4.2075 13.2358 4.19625 13.3797 4.19625 13.579C4.19625 14.2985 4.39875 14.8686 4.80375 15.3003C5.20875 15.7321 5.76 15.9479 6.45188 15.9479C7.19438 15.9479 7.83 15.6933 8.35875 15.1786C8.8875 14.6638 9.19125 13.9886 9.28125 13.1473L10.7325 1.03688C10.7494 0.948318 10.7887 0.870829 10.8506 0.809945C10.9125 0.749061 10.9856 0.715851 11.07 0.715851H14.6475C14.7319 0.715851 14.805 0.749061 14.8556 0.809945C14.9062 0.870829 14.9231 0.948318 14.9062 1.03688L13.455 13.1473C13.2975 14.459 12.8869 15.6158 12.2119 16.6176C11.5369 17.625 10.665 18.3999 9.59062 18.9478C8.51624 19.4958 7.31812 19.767 5.985 19.767C4.15125 19.767 2.69437 19.2578 1.61437 18.2338H1.61999Z"
                                fill="#C8F954"/>
                            <path
                                d="M24.1646 19.3076L22.0665 12.151C22.0327 12.079 21.9821 12.0458 21.909 12.0458H20.2496C20.1652 12.0458 20.1202 12.0901 20.1202 12.1786L19.2934 19.2301C19.2765 19.3187 19.2371 19.3962 19.1752 19.457C19.1134 19.5179 19.0402 19.5511 18.9559 19.5511H15.3784C15.294 19.5511 15.2209 19.5179 15.1702 19.457C15.1196 19.3962 15.1027 19.3187 15.1196 19.2301L17.274 1.03688C17.274 0.948318 17.3077 0.870829 17.3752 0.809945C17.4427 0.749061 17.5215 0.715851 17.6115 0.715851H25.0815C26.6002 0.715851 27.804 1.16418 28.6871 2.06083C29.5702 2.95749 30.009 4.16963 30.009 5.69173C30.009 5.86885 29.9921 6.15666 29.9584 6.55518C29.8009 7.75625 29.3959 8.79682 28.7377 9.67687C28.0796 10.5569 27.2359 11.1934 26.1952 11.5864C26.1109 11.6252 26.0827 11.686 26.1165 11.7746L28.5521 19.1748C28.569 19.2135 28.5802 19.2578 28.5802 19.3076C28.5802 19.4681 28.479 19.5511 28.2709 19.5511H24.5134C24.339 19.5511 24.2265 19.4681 24.1759 19.3076H24.1646ZM21.0034 4.66777L20.5646 8.48686C20.5309 8.57542 20.5646 8.6197 20.6659 8.6197H23.4671C24.1421 8.6197 24.699 8.40384 25.1377 7.97211C25.5765 7.54039 25.8015 6.97583 25.8015 6.27843C25.8015 5.74155 25.6327 5.31536 25.2952 4.99987C24.9577 4.68438 24.5021 4.5294 23.934 4.5294H21.1609C21.0596 4.5294 21.0034 4.57368 21.0034 4.66224V4.66777Z"
                                fill="#C8F954"/>
                            <path
                                d="M42.6545 9.91488C43.8807 10.651 44.4939 11.8078 44.4939 13.3853C44.4939 13.5458 44.477 13.8225 44.4432 14.221C44.2182 16.0143 43.4757 17.3538 42.2157 18.2283C40.9557 19.1084 39.392 19.5456 37.5245 19.5456H30.8364C30.752 19.5456 30.6789 19.5124 30.6282 19.4515C30.5776 19.3906 30.5607 19.3131 30.5776 19.2246L32.732 1.03135C32.732 0.942792 32.7657 0.865304 32.8332 0.80442C32.9007 0.743536 32.9795 0.710327 33.0695 0.710327H39.5495C41.4001 0.710327 42.8064 1.05349 43.7626 1.73428C44.7245 2.41508 45.2026 3.51099 45.2026 5.01648C45.2026 5.21574 45.1857 5.5257 45.152 5.95742C44.927 7.73412 44.1057 8.99608 42.6882 9.74883C42.587 9.80418 42.5757 9.85399 42.6601 9.90934L42.6545 9.91488ZM39.7126 15.1066C40.1345 14.7136 40.3482 14.1657 40.3482 13.4628C40.3482 12.9425 40.1851 12.544 39.8532 12.2672C39.527 11.9905 39.0489 11.8521 38.4245 11.8521H35.7301C35.6457 11.8521 35.6007 11.8964 35.6007 11.9849L35.162 15.566C35.162 15.6546 35.207 15.6989 35.2914 15.6989H37.9632C38.7057 15.6989 39.2907 15.4996 39.7126 15.1066ZM36.4557 4.66778L36.0676 8.06068C36.0339 8.14924 36.0676 8.19352 36.1689 8.19352H38.6607C39.3526 8.19352 39.8982 8.03854 40.292 7.72305C40.6914 7.40756 40.9332 6.96477 41.0176 6.38914C41.0851 5.79691 40.9557 5.33751 40.6295 5.01648C40.3032 4.69546 39.7914 4.53495 39.0995 4.53495H36.6076C36.5064 4.53495 36.4501 4.57923 36.4501 4.66778H36.4557Z"
                                fill="#C8F954"/>
                            <path
                                d="M58.3535 0.809945C58.4154 0.749061 58.4885 0.715851 58.5729 0.715851H62.1504C62.2348 0.715851 62.3079 0.749061 62.3585 0.809945C62.4091 0.870829 62.426 0.948318 62.4091 1.03688L60.2548 19.2301C60.2379 19.3187 60.1985 19.3962 60.1366 19.457C60.0748 19.5179 60.0016 19.5511 59.9173 19.5511H56.4973C56.3229 19.5511 56.2104 19.4792 56.1598 19.3353L51.5979 9.05695C51.5641 9.00161 51.5304 8.97947 51.4966 8.99054C51.4629 9.00161 51.446 9.04035 51.446 9.1123L50.2816 19.2301C50.2648 19.3187 50.2254 19.3962 50.1635 19.457C50.1016 19.5179 50.0285 19.5511 49.9441 19.5511H46.3666C46.2823 19.5511 46.2091 19.5179 46.1585 19.457C46.1079 19.3962 46.091 19.3187 46.1079 19.2301L48.2623 1.03688C48.2623 0.948318 48.296 0.870829 48.3635 0.809945C48.431 0.749061 48.5098 0.715851 48.5998 0.715851H52.0479C52.2054 0.715851 52.3066 0.787804 52.3573 0.931712L56.9191 11.1824C56.936 11.2377 56.9641 11.2598 56.9979 11.2488C57.0316 11.2377 57.0598 11.199 57.0766 11.127L58.241 1.03688C58.2579 0.948318 58.2973 0.870829 58.3591 0.809945H58.3535Z"
                                fill="#C8F954"/>
                            <path
                                d="M66.2618 18.9312C65.2156 18.3777 64.4056 17.5863 63.8262 16.5623C63.2468 15.5383 62.96 14.3539 62.96 13.0089V7.19724C62.96 5.86886 63.2468 4.70099 63.8262 3.6881C64.4056 2.67522 65.2156 1.88926 66.2618 1.33577C67.3081 0.782279 68.5231 0.5 69.9068 0.5C71.2906 0.5 72.5056 0.765676 73.5518 1.29149C74.5981 1.82284 75.4081 2.56452 75.9875 3.52759C76.5668 4.48513 76.8537 5.59765 76.8537 6.84854C76.8537 6.9371 76.8256 7.00905 76.7637 7.0644C76.7018 7.11975 76.6287 7.14742 76.5443 7.14742L72.86 7.39096C72.6518 7.39096 72.5506 7.29133 72.5506 7.09761C72.5506 6.2563 72.3087 5.58104 71.825 5.07737C71.3412 4.57369 70.7 4.32462 69.9068 4.32462C69.1137 4.32462 68.4725 4.57923 67.9887 5.09397C67.505 5.60318 67.2631 6.27291 67.2631 7.09761V13.2081C67.2631 14.0328 67.505 14.697 67.9887 15.2007C68.4725 15.7044 69.1137 15.9535 69.9068 15.9535C70.7 15.9535 71.3412 15.7044 71.825 15.2007C72.3087 14.697 72.5506 14.0328 72.5506 13.2081C72.5506 13.0089 72.6518 12.9148 72.86 12.9148L76.5443 13.103C76.6287 13.103 76.7018 13.1307 76.7637 13.186C76.8256 13.2414 76.8537 13.3022 76.8537 13.3742C76.8537 14.6472 76.5612 15.7708 75.9875 16.7394C75.4081 17.708 74.5981 18.4552 73.5518 18.9866C72.5056 19.5179 71.2906 19.7781 69.9068 19.7781C68.5231 19.7781 67.3081 19.5013 66.2618 18.9423V18.9312Z"
                                fill="#C8F954"/>
                            <path
                                d="M82.1023 18.97C81.0391 18.3888 80.2123 17.5641 79.6273 16.507C79.0366 15.4498 78.7441 14.221 78.7441 12.8207V7.44077C78.7441 6.07919 79.0366 4.87258 79.6273 3.82094C80.2123 2.76931 81.0391 1.95568 82.1023 1.37452C83.1654 0.793351 84.3973 0.5 85.7979 0.5C87.1985 0.5 88.436 0.793351 89.5048 1.37452C90.5791 1.95568 91.406 2.77485 91.9966 3.82094C92.5816 4.87258 92.8798 6.07919 92.8798 7.44077V12.8207C92.8798 14.221 92.5873 15.4498 91.9966 16.507C91.406 17.5641 90.5791 18.3888 89.5048 18.97C88.4304 19.5511 87.1985 19.8445 85.7979 19.8445C84.3973 19.8445 83.1654 19.5511 82.1023 18.97ZM87.806 15.1896C88.3179 14.6361 88.571 13.8889 88.571 12.9535V7.38542C88.571 6.47216 88.3179 5.73049 87.806 5.16593C87.2941 4.60137 86.6248 4.31909 85.7979 4.31909C84.971 4.31909 84.3241 4.60137 83.8123 5.16593C83.3004 5.73049 83.0473 6.47216 83.0473 7.38542V12.9535C83.0473 13.8889 83.3004 14.6306 83.8123 15.1896C84.3241 15.7487 84.9823 16.0254 85.7979 16.0254C86.6135 16.0254 87.2998 15.7487 87.806 15.1896Z"
                                fill="#C8F954"/>
                            <path
                                d="M104.49 19.3076L101.43 12.151C101.396 12.079 101.346 12.0458 101.272 12.0458H99.5624C99.478 12.0458 99.433 12.0901 99.433 12.1786V19.2301C99.433 19.3187 99.4049 19.3962 99.343 19.457C99.2811 19.5179 99.208 19.5511 99.1236 19.5511H95.4393C95.3549 19.5511 95.2818 19.5179 95.2199 19.457C95.158 19.3962 95.1299 19.3187 95.1299 19.2301V1.03688C95.1299 0.948318 95.158 0.870829 95.2199 0.809945C95.2818 0.749061 95.3549 0.715851 95.4393 0.715851H103.14C104.282 0.715851 105.283 0.959387 106.149 1.44092C107.016 1.928 107.685 2.61433 108.157 3.49991C108.63 4.3855 108.872 5.40392 108.872 6.55518C108.872 7.70644 108.585 8.79682 108.017 9.67687C107.449 10.5569 106.65 11.1934 105.632 11.5864C105.547 11.6252 105.519 11.686 105.553 11.7746L108.973 19.1748C109.007 19.2467 109.024 19.3021 109.024 19.3353C109.024 19.4792 108.928 19.5511 108.737 19.5511H104.844C104.67 19.5511 104.552 19.4681 104.479 19.3076H104.49ZM99.433 4.66777V8.48686C99.433 8.57542 99.478 8.6197 99.5624 8.6197H102.442C103.084 8.6197 103.601 8.43705 104.001 8.06621C104.4 7.69537 104.597 7.2083 104.597 6.59946C104.597 5.99062 104.4 5.47034 104.001 5.09396C103.601 4.71759 103.084 4.5294 102.442 4.5294H99.5624C99.478 4.5294 99.433 4.57368 99.433 4.66224V4.66777Z"
                                fill="#C8F954"/>
                            <path
                                d="M123.852 4.44084C123.79 4.50173 123.717 4.53494 123.632 4.53494H115.493C115.409 4.53494 115.364 4.57922 115.364 4.66777V7.97765C115.364 8.06621 115.409 8.11049 115.493 8.11049H120.707C120.792 8.11049 120.865 8.1437 120.927 8.20458C120.989 8.26546 121.017 8.34295 121.017 8.43151V11.5809C121.017 11.6694 120.989 11.7469 120.927 11.8078C120.865 11.8687 120.792 11.9019 120.707 11.9019H115.493C115.409 11.9019 115.364 11.9462 115.364 12.0347V15.5881C115.364 15.6767 115.409 15.721 115.493 15.721H123.632C123.717 15.721 123.79 15.7542 123.852 15.8151C123.914 15.876 123.942 15.9534 123.942 16.042V19.219C123.942 19.3076 123.914 19.3851 123.852 19.446C123.79 19.5069 123.717 19.5401 123.632 19.5401H111.37C111.286 19.5401 111.212 19.5069 111.151 19.446C111.089 19.3851 111.061 19.3076 111.061 19.219V1.03688C111.061 0.948318 111.089 0.870829 111.151 0.809945C111.212 0.749061 111.286 0.715851 111.37 0.715851H123.632C123.717 0.715851 123.79 0.749061 123.852 0.809945C123.914 0.870829 123.942 0.948318 123.942 1.03688V4.21391C123.942 4.30247 123.914 4.37996 123.852 4.44084Z"
                                fill="#C8F954"/>
                        </svg>

                        </Link>

                        <div className="Frame192">

                            <Link to="/" className="Link-clothes">clothes </Link>

                            <Link to="/face&body" className="Link-face">face & body </Link>

                        </div>

                    </div>

                    {/*Пошук*/}
                    <form className="Frame190" onSubmit={handleSearch}>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" required />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>


                    <div className="Frame69">

                        {userState ? (

                            isAdmin ? (
                                <Link to="/admin" className="regButton">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path d="M26.6663 28V25.3333C26.6663 23.9188 26.1044 22.5623 25.1042 21.5621C24.104 20.5619 22.7475 20 21.333 20H10.6663C9.25185 20 7.8953 20.5619 6.8951 21.5621C5.89491 22.5623 5.33301 23.9188 5.33301 25.3333V28" fill="#C8F954"/>
                                        <path d="M26.6663 28V25.3333C26.6663 23.9188 26.1044 22.5623 25.1042 21.5621C24.104 20.5619 22.7475 20 21.333 20H10.6663C9.25185 20 7.8953 20.5619 6.8951 21.5621C5.89491 22.5623 5.33301 23.9188 5.33301 25.3333V28H26.6663Z" stroke="#C8F954" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16.0003 14.6667C18.9458 14.6667 21.3337 12.2789 21.3337 9.33333C21.3337 6.38781 18.9458 4 16.0003 4C13.0548 4 10.667 6.38781 10.667 9.33333C10.667 12.2789 13.0548 14.6667 16.0003 14.6667Z" fill="#C8F954" stroke="#C8F954" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>
                            ) : (
                            <Link to="/user-info" className="regButton">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M26.6663 28V25.3333C26.6663 23.9188 26.1044 22.5623 25.1042 21.5621C24.104 20.5619 22.7475 20 21.333 20H10.6663C9.25185 20 7.8953 20.5619 6.8951 21.5621C5.89491 22.5623 5.33301 23.9188 5.33301 25.3333V28" fill="#C8F954"/>
                                    <path d="M26.6663 28V25.3333C26.6663 23.9188 26.1044 22.5623 25.1042 21.5621C24.104 20.5619 22.7475 20 21.333 20H10.6663C9.25185 20 7.8953 20.5619 6.8951 21.5621C5.89491 22.5623 5.33301 23.9188 5.33301 25.3333V28H26.6663Z" stroke="#C8F954" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16.0003 14.6667C18.9458 14.6667 21.3337 12.2789 21.3337 9.33333C21.3337 6.38781 18.9458 4 16.0003 4C13.0548 4 10.667 6.38781 10.667 9.33333C10.667 12.2789 13.0548 14.6667 16.0003 14.6667Z" fill="#C8F954" stroke="#C8F954" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            )

                        ) : (
                            <Link to="/login" className="regButton">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M26.6663 28V25.3333C26.6663 23.9188 26.1044 22.5623 25.1042 21.5621C24.104 20.5619 22.7475 20 21.333 20H10.6663C9.25185 20 7.8953 20.5619 6.8951 21.5621C5.89491 22.5623 5.33301 23.9188 5.33301 25.3333V28" stroke="#C8F954" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16.0003 14.6667C18.9458 14.6667 21.3337 12.2789 21.3337 9.33333C21.3337 6.38781 18.9458 4 16.0003 4C13.0548 4 10.667 6.38781 10.667 9.33333C10.667 12.2789 13.0548 14.6667 16.0003 14.6667Z" stroke="#C8F954" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        )}

                        {basketCount.length>0 ? (

                            <Link to="/basket" className="regButton-3">{basketCount.length>0 ? basketCount.length:''}
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <g clipPath="url(#clip0_869_17670)">
                                    <path d="M12.0013 29.3333C12.7377 29.3333 13.3346 28.7364 13.3346 28C13.3346 27.2636 12.7377 26.6667 12.0013 26.6667C11.2649 26.6667 10.668 27.2636 10.668 28C10.668 28.7364 11.2649 29.3333 12.0013 29.3333Z" stroke="#C8F954" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M26.6654 29.3333C27.4017 29.3333 27.9987 28.7364 27.9987 28C27.9987 27.2636 27.4017 26.6667 26.6654 26.6667C25.929 26.6667 25.332 27.2636 25.332 28C25.332 28.7364 25.929 29.3333 26.6654 29.3333Z" stroke="#C8F954" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7.9987 8L10.2387 19.1867C10.3606 19.8005 10.6946 20.3519 11.1821 20.7444C11.6696 21.1368 12.2796 21.3453 12.9054 21.3333H25.8654C26.4911 21.3453 27.1011 21.1368 27.5886 20.7444C28.0762 20.3519 28.4101 19.8005 28.532 19.1867L30.6654 8H7.9987Z" fill="#C8F954"/>
                                    <path d="M1.33203 1.33334H6.66536L10.2387 19.1867M10.2387 19.1867C10.3606 19.8005 10.6946 20.3519 11.1821 20.7444C11.6696 21.1368 12.2796 21.3453 12.9054 21.3333H25.8654C26.4911 21.3453 27.1011 21.1368 27.5886 20.7444C28.0762 20.3519 28.4101 19.8005 28.532 19.1867L30.6654 8H7.9987L10.2387 19.1867Z" stroke="#C8F954" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_869_17670">
                                        <rect width="32" height="32" fill="white"/>
                                    </clipPath>
                                </defs>
                                 </svg>
                            </Link>

                        ):(
                            <Link to="/basket" className="regButton">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <g clipPath="url(#clip0_331_1382)">
                                        <path d="M12.0003 29.3333C12.7367 29.3333 13.3337 28.7364 13.3337 28C13.3337 27.2636 12.7367 26.6667 12.0003 26.6667C11.2639 26.6667 10.667 27.2636 10.667 28C10.667 28.7364 11.2639 29.3333 12.0003 29.3333Z" stroke="#C8F954" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M26.6663 29.3333C27.4027 29.3333 27.9997 28.7364 27.9997 28C27.9997 27.2636 27.4027 26.6667 26.6663 26.6667C25.93 26.6667 25.333 27.2636 25.333 28C25.333 28.7364 25.93 29.3333 26.6663 29.3333Z" stroke="#C8F954" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M1.33301 1.33334H6.66634L10.2397 19.1867C10.3616 19.8005 10.6956 20.352 11.1831 20.7444C11.6706 21.1369 12.2806 21.3453 12.9063 21.3333H25.8663C26.4921 21.3453 27.1021 21.1369 27.5896 20.7444C28.0771 20.352 28.4111 19.8005 28.533 19.1867L30.6663 8.00001H7.99967" stroke="#C8F954" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_331_1382">
                                            <rect width="32" height="32" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Link>
                        )}



                        {favorite.length>0 ?(
                            <Link to="/favorite" className="regButton-3">{favorite.length > 0 ? favorite.length : ''}
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                    <path d="M15.487 3.54831C15.938 2.32944 17.662 2.32944 18.113 3.54831L21.1141 11.6587C21.2559 12.0419 21.5581 12.3441 21.9413 12.4859L30.0517 15.487C31.2706 15.938 31.2706 17.662 30.0517 18.113L21.9413 21.1141C21.5581 21.2559 21.2559 21.5581 21.1141 21.9413L18.113 30.0517C17.662 31.2706 15.938 31.2706 15.487 30.0517L12.4859 21.9413C12.3441 21.5581 12.0419 21.2559 11.6587 21.1141L3.54831 18.113C2.32944 17.662 2.32944 15.938 3.54831 15.487L11.6587 12.4859C12.0419 12.3441 12.3441 12.0419 12.4859 11.6587L15.487 3.54831Z" fill="#C8F954" stroke="#C8F954" strokeWidth="3"/>
                                </svg>
                            </Link>
                        ) : (

                            <Link to="/favorite" className="regButton">
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                    <path d="M15.487 3.54831C15.938 2.32944 17.662 2.32944 18.113 3.54831L21.1141 11.6587C21.2559 12.0419 21.5581 12.3441 21.9413 12.4859L30.0517 15.487C31.2706 15.938 31.2706 17.662 30.0517 18.113L21.9413 21.1141C21.5581 21.2559 21.2559 21.5581 21.1141 21.9413L18.113 30.0517C17.662 31.2706 15.938 31.2706 15.487 30.0517L12.4859 21.9413C12.3441 21.5581 12.0419 21.2559 11.6587 21.1141L3.54831 18.113C2.32944 17.662 2.32944 15.938 3.54831 15.487L11.6587 12.4859C12.0419 12.3441 12.3441 12.0419 12.4859 11.6587L15.487 3.54831Z" stroke="#C8F954" strokeWidth="3"/>
                                </svg>
                            </Link>
                        )}

                    </div>

                </div>

            </section>
        </>
    )
}

export default  DefaultHeader;