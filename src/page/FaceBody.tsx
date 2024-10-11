import "./style/faceBody.css";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import http from "../http_common.ts";
import {GetProductByIdDto} from "../components/types.ts";
import {FavoriteActionType} from "../store/slice/favoriteSlise.ts";
import {APP_ENV} from "../env";
import {useDispatch} from "react-redux";

const FaceBody=()=>{

    const baseUrl = APP_ENV.BASE_URL;
    const dispatch = useDispatch();
    const [parfumeGet, parfumeSet] = useState<GetProductByIdDto[]>([]);
    const [makeUpGet, makeUpSet] = useState<GetProductByIdDto[]>([]);
    const [SkinCareGet, SkinCareSet] = useState<GetProductByIdDto[]>([]);

    useEffect(() => {

        http.get("api/Dashboard/GetAllPerfumeWithoutPagination").then(resp => {
            parfumeSet(resp.data);
            console.log("Прийшли парфуми", resp.data);
        });
    }, []);

    useEffect(() => {

        http.get("api/Dashboard/GetAllMakeUpWithoutPagination").then(resp => {
            makeUpSet(resp.data);
            console.log("Прийшов MakeUp", resp.data);
        });
    }, []);

    useEffect(() => {

        http.get("api/Dashboard/GetAllSkinCareWithoutPagination").then(resp => {
            SkinCareSet(resp.data);
            console.log("Прийшли креми", resp.data);
        });
    }, []);

    const addItemToCart = (productId: number) => {

        console.log("Прийшло", productId);

        // Отримуємо поточний кошик з Local Storage або створюємо порожній масив
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Перевіряємо, чи існує такий товар у кошику. Якщо існує, то поверне його id
        // Якщо не існує, то поверне -1
        const index = cart.indexOf(productId);

        if (index !== -1)
        {
            // Якщо товар є, видаляємо його
            cart.splice(index, 1);
        }
        else
        {
            // Якщо товару немає, додаємо його
            cart.push(productId);
        }

        // Оновлюємо Local Storage з новим значенням
        localStorage.setItem('cart', JSON.stringify(cart));

        // Оновлюємо стан з новим кошиком
        dispatch({
            type: FavoriteActionType.ADD_FAVORITE,
            payload: cart
        });
    };

    const handleStarClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Отримуємо саму зірочку зі SVG
        const star = event.currentTarget.querySelector('svg');

        if (star)
        {
            // Додаємо/видаляємо клас 'filled' для конкретної зірочки
            star.classList.toggle('filled');
        }
    };



    return (
        <>
            <section className="MainBody">

                <div className="Rectangle10">

                    <span>rebel</span>

                    <span>glam</span>

                    <Link
                    to="">Shop Now
                    </Link>
                </div>

                <div className="Frame335">

                    <div className="Frame200">

                        <Link
                        to="/makeupProducts"
                        className="Frame199">Make up

                        </Link>

                        <Link
                            to="/skincareProducts"
                            className="Frame198">skin care

                        </Link>

                        <Link
                            to="/haircareProducts"
                            className="Frame197">hair care

                        </Link>

                        <Link
                            to="/perfumeProducts"
                            className="Frame196">perfume

                        </Link>

                    </div>


                    <div className="Weve">
                     <span >We’ve gathered the best products to help you maintain skin health, smell fantastic at parties, and create unique make up looks to shine brightly in life as the star that you are!</span>
                    </div>
                </div>

                <div className="Frame222">

                    <span>Bestsellers</span>

                    <div className="Frame221">

                    <div className="Frame216">

                        {parfumeGet[0] && (


                        <div className="Frame215-new">

                            <div className="Frame208-1">

                                <img alt={`Foto ${parfumeGet[0].name}`} src={`${baseUrl}product/${parfumeGet[0].imageUrls[0]}`} className="Foto-208"/>

                                <button className="favorite208"

                                        onClick={(event) => {
                                            handleStarClick(event);  // Перша функція для зміни стану зірочки
                                            addItemToCart(parfumeGet[0].id);  // Друга функція для додавання товару в кошик
                                        }}>

                                    <svg id="star208-1"  xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <path  d="M16.1716 1.90088C16.4132 1.24791 17.3368 1.24792 17.5784 1.90088L21.3131 11.9938C21.3891 12.1991 21.5509 12.3609 21.7562 12.4369L31.8491 16.1716C32.5021 16.4132 32.5021 17.3368 31.8491 17.5784L21.7562 21.3131C21.5509 21.3891 21.3891 21.5509 21.3131 21.7562L17.5784 31.8491C17.3368 32.5021 16.4132 32.5021 16.1716 31.8491L12.4369 21.7562C12.3609 21.5509 12.1991 21.3891 11.9938 21.3131L1.90088 17.5784C1.24791 17.3368 1.24792 16.4132 1.90088 16.1716L11.9938 12.4369C12.1991 12.3609 12.3609 12.1991 12.4369 11.9938L16.1716 1.90088Z" stroke="#0D0D0D" strokeWidth="1.5"/>
                                    </svg>

                                </button>

                            </div>

                            <div className="Frame213-3">

                                <div className="Frame220-2">

                                    <div className="Frame207-4">

                                        <div className="Frame206-2">

                                            <span>{parfumeGet[0].name}</span>

                                            <span>{parfumeGet[0].sizeAndFit}</span>

                                        </div>

                                        <div className="Example">

                                            <span className="FramePrice">£{parfumeGet[0].price}</span>

                                            <Link
                                                to={`/product/${parfumeGet[0].id}`}
                                                  className="Arrow1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none">
                                                    <path d="M71.4142 43.4142C72.1953 42.6332 72.1953 41.3668 71.4142 40.5858L58.6863 27.8579C57.9052 27.0768 56.6389 27.0768 55.8579 27.8579C55.0768 28.6389 55.0768 29.9052 55.8579 30.6863L67.1716 42L55.8579 53.3137C55.0768 54.0948 55.0768 55.3611 55.8579 56.1421C56.6389 56.9232 57.9052 56.9232 58.6863 56.1421L71.4142 43.4142ZM14 44H70V40H14V44Z" fill="#0D0D0D"/>
                                                </svg>
                                            </Link>

                                        </div>



                                    </div>

                                </div>

                            </div>

                        </div>

                        )}

                        {parfumeGet[1] && (
                        <div className="Frame215-new">

                            <div className="Frame208-1">

                                <img alt={`Foto ${parfumeGet[1].name}`} src={`${baseUrl}product/${parfumeGet[1].imageUrls[0]}`} className="Foto-208"/>

                                <button className="favorite208"

                                        onClick={(event) => {
                                            handleStarClick(event);  // Перша функція для зміни стану зірочки
                                            addItemToCart(parfumeGet[1].id);  // Друга функція для додавання товару в кошик
                                        }}
                                >
                                    <svg id="star208-1"  xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <path  d="M16.1716 1.90088C16.4132 1.24791 17.3368 1.24792 17.5784 1.90088L21.3131 11.9938C21.3891 12.1991 21.5509 12.3609 21.7562 12.4369L31.8491 16.1716C32.5021 16.4132 32.5021 17.3368 31.8491 17.5784L21.7562 21.3131C21.5509 21.3891 21.3891 21.5509 21.3131 21.7562L17.5784 31.8491C17.3368 32.5021 16.4132 32.5021 16.1716 31.8491L12.4369 21.7562C12.3609 21.5509 12.1991 21.3891 11.9938 21.3131L1.90088 17.5784C1.24791 17.3368 1.24792 16.4132 1.90088 16.1716L11.9938 12.4369C12.1991 12.3609 12.3609 12.1991 12.4369 11.9938L16.1716 1.90088Z" stroke="#0D0D0D" strokeWidth="1.5"/>
                                    </svg>

                                </button>

                            </div>

                            <div className="Frame213-3">

                                <div className="Frame220-2">

                                    <div className="Frame207-4">

                                        <div className="Frame206-2">

                                            <span>{parfumeGet[1].name}</span>

                                            <span>{parfumeGet[1].sizeAndFit}</span>

                                        </div>

                                        <div className="Example">

                                            <span className="FramePrice">£{parfumeGet[1].price}</span>

                                            <Link

                                                to={`/product/${parfumeGet[1].id}`}
                                                  className="Arrow1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none">
                                                    <path d="M71.4142 43.4142C72.1953 42.6332 72.1953 41.3668 71.4142 40.5858L58.6863 27.8579C57.9052 27.0768 56.6389 27.0768 55.8579 27.8579C55.0768 28.6389 55.0768 29.9052 55.8579 30.6863L67.1716 42L55.8579 53.3137C55.0768 54.0948 55.0768 55.3611 55.8579 56.1421C56.6389 56.9232 57.9052 56.9232 58.6863 56.1421L71.4142 43.4142ZM14 44H70V40H14V44Z" fill="#0D0D0D"/>
                                                </svg>
                                            </Link>

                                        </div>



                                    </div>

                                </div>

                            </div>

                        </div>

                        )}

                        <div className="Wild">

                                <span>wild</span>

                        </div>

                    </div>

                    <div className="Frame219">

                        <div className="Free">

                            <span>free</span>

                        </div>

                        {makeUpGet[0] && (

                        <div className="Frame215-new">

                            <div className="Frame208-1">

                                <img alt={`Foto ${makeUpGet[0].name}`} src={`${baseUrl}product/${makeUpGet[0].imageUrls[0]}`} className="Foto-208"/>

                                <button className="favorite208"

                                        onClick={(event) => {
                                            handleStarClick(event);  // Перша функція для зміни стану зірочки
                                            addItemToCart(makeUpGet[0].id);  // Друга функція для додавання товару в кошик
                                        }}
                                >

                                    <svg id="star208-1"  xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <path  d="M16.1716 1.90088C16.4132 1.24791 17.3368 1.24792 17.5784 1.90088L21.3131 11.9938C21.3891 12.1991 21.5509 12.3609 21.7562 12.4369L31.8491 16.1716C32.5021 16.4132 32.5021 17.3368 31.8491 17.5784L21.7562 21.3131C21.5509 21.3891 21.3891 21.5509 21.3131 21.7562L17.5784 31.8491C17.3368 32.5021 16.4132 32.5021 16.1716 31.8491L12.4369 21.7562C12.3609 21.5509 12.1991 21.3891 11.9938 21.3131L1.90088 17.5784C1.24791 17.3368 1.24792 16.4132 1.90088 16.1716L11.9938 12.4369C12.1991 12.3609 12.3609 12.1991 12.4369 11.9938L16.1716 1.90088Z" stroke="#0D0D0D" strokeWidth="1.5"/>
                                    </svg>

                                </button>

                            </div>

                            <div className="Frame213-3">

                                <div className="Frame220-2">

                                    <div className="Frame207-4">

                                        <div className="Frame206-2">

                                            <span>{makeUpGet[0].name}</span>

                                            <span>{makeUpGet[0].sizeAndFit}</span>

                                        </div>

                                        <div className="Example">

                                            <span className="FramePrice">£{makeUpGet[0].price}</span>

                                            <Link
                                                to={`/product/${makeUpGet[0].id}`}

                                                  className="Arrow1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none">
                                                    <path d="M71.4142 43.4142C72.1953 42.6332 72.1953 41.3668 71.4142 40.5858L58.6863 27.8579C57.9052 27.0768 56.6389 27.0768 55.8579 27.8579C55.0768 28.6389 55.0768 29.9052 55.8579 30.6863L67.1716 42L55.8579 53.3137C55.0768 54.0948 55.0768 55.3611 55.8579 56.1421C56.6389 56.9232 57.9052 56.9232 58.6863 56.1421L71.4142 43.4142ZM14 44H70V40H14V44Z" fill="#0D0D0D"/>
                                                </svg>
                                            </Link>

                                        </div>



                                    </div>

                                </div>

                            </div>

                        </div>

                        )}

                        {makeUpGet[1] && (
                            <div className="Frame215-new">

                            <div className="Frame208-1">

                                <img alt={`Foto ${makeUpGet[1].name}`} src={`${baseUrl}product/${makeUpGet[1].imageUrls[0]}`} className="Foto-208" />

                                <button className="favorite208"

                                        onClick={(event) => {
                                            handleStarClick(event);  // Перша функція для зміни стану зірочки
                                            addItemToCart(makeUpGet[1].id);  // Друга функція для додавання товару в кошик
                                        }}

                                >
                                    <svg id="star208-1"  xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <path  d="M16.1716 1.90088C16.4132 1.24791 17.3368 1.24792 17.5784 1.90088L21.3131 11.9938C21.3891 12.1991 21.5509 12.3609 21.7562 12.4369L31.8491 16.1716C32.5021 16.4132 32.5021 17.3368 31.8491 17.5784L21.7562 21.3131C21.5509 21.3891 21.3891 21.5509 21.3131 21.7562L17.5784 31.8491C17.3368 32.5021 16.4132 32.5021 16.1716 31.8491L12.4369 21.7562C12.3609 21.5509 12.1991 21.3891 11.9938 21.3131L1.90088 17.5784C1.24791 17.3368 1.24792 16.4132 1.90088 16.1716L11.9938 12.4369C12.1991 12.3609 12.3609 12.1991 12.4369 11.9938L16.1716 1.90088Z" stroke="#0D0D0D" strokeWidth="1.5"/>
                                    </svg>

                                </button>

                            </div>

                            <div className="Frame213-3">

                                <div className="Frame220-2">

                                    <div className="Frame207-4">

                                        <div className="Frame206-2">

                                            <span>{makeUpGet[1].name}</span>

                                            <span>{makeUpGet[1].sizeAndFit}</span>

                                        </div>

                                        <div className="Example">

                                            <span className="FramePrice">£{makeUpGet[1].price}</span>

                                            <Link

                                                to={`/product/${makeUpGet[1].id}`}
                                                  className="Arrow1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none">
                                                    <path d="M71.4142 43.4142C72.1953 42.6332 72.1953 41.3668 71.4142 40.5858L58.6863 27.8579C57.9052 27.0768 56.6389 27.0768 55.8579 27.8579C55.0768 28.6389 55.0768 29.9052 55.8579 30.6863L67.1716 42L55.8579 53.3137C55.0768 54.0948 55.0768 55.3611 55.8579 56.1421C56.6389 56.9232 57.9052 56.9232 58.6863 56.1421L71.4142 43.4142ZM14 44H70V40H14V44Z" fill="#0D0D0D"/>
                                                </svg>
                                            </Link>

                                        </div>



                                    </div>

                                </div>

                            </div>

                        </div>
                        )}

                    </div>

                    </div>

                </div>

                <div className="Frame225">

                    <div className="Frame224">

                        <div className="Frame223">

                            <span>Get in gorgeous, we’ve new</span>

                            <span> arrivals!</span>

                        </div>

                        <Link
                        to=""
                        className="ShopNow">Shop Now

                        </Link>

                    </div>


                </div>

                <div className="Frame430">

                    <div className="Frame250">

                        {SkinCareGet[0] && (

                            <div className="Frame249-1">

                                <div className="Component1">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="144" height="144" viewBox="0 0 144 144" fill="none">
                                        <path d="M51.4595 2.6937C51.2172 0.425172 54.3522 -0.414835 55.2767 1.67092L70.2749 35.5105C70.9779 37.0967 73.2288 37.0967 73.9318 35.5105L88.93 1.6709C89.8544 -0.414853 92.9894 0.425183 92.7471 2.69371L88.8161 39.4988C88.6319 41.2239 90.5812 42.3494 91.9831 41.3272L121.892 19.5204C123.735 18.1763 126.03 20.4712 124.686 22.3147L102.879 52.2233C101.857 53.6252 102.982 55.5746 104.708 55.3903L141.513 51.4593C143.781 51.217 144.621 54.352 142.536 55.2765L108.696 70.2746C107.11 70.9776 107.11 73.2286 108.696 73.9316L142.535 88.9297C144.621 89.8542 143.781 92.9892 141.513 92.7469L104.708 88.8159C102.983 88.6316 101.857 90.581 102.879 91.9829L124.686 121.891C126.03 123.735 123.735 126.03 121.892 124.686L91.9831 102.879C90.5812 101.857 88.6319 102.982 88.8161 104.707L92.7471 141.513C92.9894 143.781 89.8544 144.621 88.93 142.535L73.9318 108.696C73.2288 107.11 70.9779 107.11 70.2749 108.696L55.2767 142.535C54.3522 144.621 51.2172 143.781 51.4595 141.512L55.3905 104.707C55.5748 102.982 53.6254 101.857 52.2235 102.879L22.3149 124.686C20.4714 126.03 18.1765 123.735 19.5206 121.891L41.3275 91.9829C42.3496 90.581 41.2241 88.6316 39.499 88.8159L2.69392 92.7469C0.425386 92.9892 -0.414621 89.8542 1.67113 88.9297L35.5108 73.9316C37.0969 73.2286 37.0969 70.9776 35.5107 70.2746L1.67111 55.2764C-0.414638 54.352 0.425398 51.217 2.69393 51.4593L39.499 55.3903C41.2241 55.5746 42.3496 53.6252 41.3274 52.2233L19.5206 22.3147C18.1765 20.4712 20.4715 18.1763 22.3149 19.5204L52.2235 41.3272C53.6254 42.3494 55.5748 41.2239 55.3905 39.4988L51.4595 2.6937Z" fill="#C8F954"/>
                                    </svg>

                                    <span className="Top-1">top</span>

                                </div>

                                <div className="Frame228">

                                    <img alt={`Foto ${SkinCareGet[0].name}`} src={`${baseUrl}product/${SkinCareGet[0].imageUrls[0]}`}/>

                                    <button className="favorite209"

                                            onClick={(event) => {
                                                handleStarClick(event);  // Перша функція для зміни стану зірочки
                                                addItemToCart(SkinCareGet[0].id);  // Друга функція для додавання товару в кошик
                                            }}

                                    >
                                        <svg id="star209"  xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                            <path  d="M16.1716 1.90088C16.4132 1.24791 17.3368 1.24792 17.5784 1.90088L21.3131 11.9938C21.3891 12.1991 21.5509 12.3609 21.7562 12.4369L31.8491 16.1716C32.5021 16.4132 32.5021 17.3368 31.8491 17.5784L21.7562 21.3131C21.5509 21.3891 21.3891 21.5509 21.3131 21.7562L17.5784 31.8491C17.3368 32.5021 16.4132 32.5021 16.1716 31.8491L12.4369 21.7562C12.3609 21.5509 12.1991 21.3891 11.9938 21.3131L1.90088 17.5784C1.24791 17.3368 1.24792 16.4132 1.90088 16.1716L11.9938 12.4369C12.1991 12.3609 12.3609 12.1991 12.4369 11.9938L16.1716 1.90088Z" stroke="#0D0D0D" strokeWidth="1.5"/>
                                        </svg>

                                    </button>
                                </div>

                                <div className="Frame207-4">

                                    <div className="Frame206-2">

                                        <span>{SkinCareGet[0].name}</span>

                                        <span>{SkinCareGet[0].sizeAndFit}</span>

                                    </div>

                                    <div className="Example">

                                        <span className="FramePrice">£{SkinCareGet[0].price}</span>

                                        <Link

                                            to={`/product/${SkinCareGet[0].id}`}
                                            className="Arrow1"

                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none">
                                                <path d="M71.4142 43.4142C72.1953 42.6332 72.1953 41.3668 71.4142 40.5858L58.6863 27.8579C57.9052 27.0768 56.6389 27.0768 55.8579 27.8579C55.0768 28.6389 55.0768 29.9052 55.8579 30.6863L67.1716 42L55.8579 53.3137C55.0768 54.0948 55.0768 55.3611 55.8579 56.1421C56.6389 56.9232 57.9052 56.9232 58.6863 56.1421L71.4142 43.4142ZM14 44H70V40H14V44Z" fill="#0D0D0D"/>
                                            </svg>
                                        </Link>

                                    </div>

                                </div>

                            </div>
                        )}

                        {SkinCareGet[1] && (

                            <div className="Frame249-1">

                                <div className="Component1">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="144" height="144" viewBox="0 0 144 144" fill="none">
                                        <path d="M51.4595 2.6937C51.2172 0.425172 54.3522 -0.414835 55.2767 1.67092L70.2749 35.5105C70.9779 37.0967 73.2288 37.0967 73.9318 35.5105L88.93 1.6709C89.8544 -0.414853 92.9894 0.425183 92.7471 2.69371L88.8161 39.4988C88.6319 41.2239 90.5812 42.3494 91.9831 41.3272L121.892 19.5204C123.735 18.1763 126.03 20.4712 124.686 22.3147L102.879 52.2233C101.857 53.6252 102.982 55.5746 104.708 55.3903L141.513 51.4593C143.781 51.217 144.621 54.352 142.536 55.2765L108.696 70.2746C107.11 70.9776 107.11 73.2286 108.696 73.9316L142.535 88.9297C144.621 89.8542 143.781 92.9892 141.513 92.7469L104.708 88.8159C102.983 88.6316 101.857 90.581 102.879 91.9829L124.686 121.891C126.03 123.735 123.735 126.03 121.892 124.686L91.9831 102.879C90.5812 101.857 88.6319 102.982 88.8161 104.707L92.7471 141.513C92.9894 143.781 89.8544 144.621 88.93 142.535L73.9318 108.696C73.2288 107.11 70.9779 107.11 70.2749 108.696L55.2767 142.535C54.3522 144.621 51.2172 143.781 51.4595 141.512L55.3905 104.707C55.5748 102.982 53.6254 101.857 52.2235 102.879L22.3149 124.686C20.4714 126.03 18.1765 123.735 19.5206 121.891L41.3275 91.9829C42.3496 90.581 41.2241 88.6316 39.499 88.8159L2.69392 92.7469C0.425386 92.9892 -0.414621 89.8542 1.67113 88.9297L35.5108 73.9316C37.0969 73.2286 37.0969 70.9776 35.5107 70.2746L1.67111 55.2764C-0.414638 54.352 0.425398 51.217 2.69393 51.4593L39.499 55.3903C41.2241 55.5746 42.3496 53.6252 41.3274 52.2233L19.5206 22.3147C18.1765 20.4712 20.4715 18.1763 22.3149 19.5204L52.2235 41.3272C53.6254 42.3494 55.5748 41.2239 55.3905 39.4988L51.4595 2.6937Z" fill="#C8F954"/>
                                    </svg>

                                    <span className="Top-1">top</span>

                                </div>

                                <div className="Frame228">

                                    <img alt={`Foto ${SkinCareGet[1].name}`} src={`${baseUrl}product/${SkinCareGet[1].imageUrls[0]}`}/>

                                    <button className="favorite209"

                                            onClick={(event) => {
                                                handleStarClick(event);  // Перша функція для зміни стану зірочки
                                                addItemToCart(SkinCareGet[1].id);  // Друга функція для додавання товару в кошик
                                            }}

                                    >
                                        <svg id="star209"  xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                            <path  d="M16.1716 1.90088C16.4132 1.24791 17.3368 1.24792 17.5784 1.90088L21.3131 11.9938C21.3891 12.1991 21.5509 12.3609 21.7562 12.4369L31.8491 16.1716C32.5021 16.4132 32.5021 17.3368 31.8491 17.5784L21.7562 21.3131C21.5509 21.3891 21.3891 21.5509 21.3131 21.7562L17.5784 31.8491C17.3368 32.5021 16.4132 32.5021 16.1716 31.8491L12.4369 21.7562C12.3609 21.5509 12.1991 21.3891 11.9938 21.3131L1.90088 17.5784C1.24791 17.3368 1.24792 16.4132 1.90088 16.1716L11.9938 12.4369C12.1991 12.3609 12.3609 12.1991 12.4369 11.9938L16.1716 1.90088Z" stroke="#0D0D0D" strokeWidth="1.5"/>
                                        </svg>

                                    </button>
                                </div>

                                <div className="Frame207-4">

                                    <div className="Frame206-2">

                                        <span>{SkinCareGet[1].name}</span>

                                        <span>{SkinCareGet[1].sizeAndFit}</span>

                                    </div>

                                    <div className="Example">

                                        <span className="FramePrice">£{SkinCareGet[1].price}</span>

                                        <Link
                                            to={`/product/${SkinCareGet[1].id}`}
                                              className="Arrow1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none">
                                                <path d="M71.4142 43.4142C72.1953 42.6332 72.1953 41.3668 71.4142 40.5858L58.6863 27.8579C57.9052 27.0768 56.6389 27.0768 55.8579 27.8579C55.0768 28.6389 55.0768 29.9052 55.8579 30.6863L67.1716 42L55.8579 53.3137C55.0768 54.0948 55.0768 55.3611 55.8579 56.1421C56.6389 56.9232 57.9052 56.9232 58.6863 56.1421L71.4142 43.4142ZM14 44H70V40H14V44Z" fill="#0D0D0D"/>
                                            </svg>
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        )}

                        {SkinCareGet[2] && (

                            <div className="Frame249-1">

                                <div className="Component1">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="144" height="144" viewBox="0 0 144 144" fill="none">
                                        <path d="M51.4595 2.6937C51.2172 0.425172 54.3522 -0.414835 55.2767 1.67092L70.2749 35.5105C70.9779 37.0967 73.2288 37.0967 73.9318 35.5105L88.93 1.6709C89.8544 -0.414853 92.9894 0.425183 92.7471 2.69371L88.8161 39.4988C88.6319 41.2239 90.5812 42.3494 91.9831 41.3272L121.892 19.5204C123.735 18.1763 126.03 20.4712 124.686 22.3147L102.879 52.2233C101.857 53.6252 102.982 55.5746 104.708 55.3903L141.513 51.4593C143.781 51.217 144.621 54.352 142.536 55.2765L108.696 70.2746C107.11 70.9776 107.11 73.2286 108.696 73.9316L142.535 88.9297C144.621 89.8542 143.781 92.9892 141.513 92.7469L104.708 88.8159C102.983 88.6316 101.857 90.581 102.879 91.9829L124.686 121.891C126.03 123.735 123.735 126.03 121.892 124.686L91.9831 102.879C90.5812 101.857 88.6319 102.982 88.8161 104.707L92.7471 141.513C92.9894 143.781 89.8544 144.621 88.93 142.535L73.9318 108.696C73.2288 107.11 70.9779 107.11 70.2749 108.696L55.2767 142.535C54.3522 144.621 51.2172 143.781 51.4595 141.512L55.3905 104.707C55.5748 102.982 53.6254 101.857 52.2235 102.879L22.3149 124.686C20.4714 126.03 18.1765 123.735 19.5206 121.891L41.3275 91.9829C42.3496 90.581 41.2241 88.6316 39.499 88.8159L2.69392 92.7469C0.425386 92.9892 -0.414621 89.8542 1.67113 88.9297L35.5108 73.9316C37.0969 73.2286 37.0969 70.9776 35.5107 70.2746L1.67111 55.2764C-0.414638 54.352 0.425398 51.217 2.69393 51.4593L39.499 55.3903C41.2241 55.5746 42.3496 53.6252 41.3274 52.2233L19.5206 22.3147C18.1765 20.4712 20.4715 18.1763 22.3149 19.5204L52.2235 41.3272C53.6254 42.3494 55.5748 41.2239 55.3905 39.4988L51.4595 2.6937Z" fill="#C8F954"/>
                                    </svg>

                                    <span className="Top-1">top</span>

                                </div>

                                <div className="Frame228">

                                    <img alt={`Foto ${SkinCareGet[2].name}`} src={`${baseUrl}product/${SkinCareGet[2].imageUrls[0]}`}/>

                                    <button className="favorite209"

                                            onClick={(event) => {
                                                handleStarClick(event);  // Перша функція для зміни стану зірочки
                                                addItemToCart(SkinCareGet[2].id);  // Друга функція для додавання товару в кошик
                                            }}
                                    >
                                        <svg id="star209"  xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                            <path  d="M16.1716 1.90088C16.4132 1.24791 17.3368 1.24792 17.5784 1.90088L21.3131 11.9938C21.3891 12.1991 21.5509 12.3609 21.7562 12.4369L31.8491 16.1716C32.5021 16.4132 32.5021 17.3368 31.8491 17.5784L21.7562 21.3131C21.5509 21.3891 21.3891 21.5509 21.3131 21.7562L17.5784 31.8491C17.3368 32.5021 16.4132 32.5021 16.1716 31.8491L12.4369 21.7562C12.3609 21.5509 12.1991 21.3891 11.9938 21.3131L1.90088 17.5784C1.24791 17.3368 1.24792 16.4132 1.90088 16.1716L11.9938 12.4369C12.1991 12.3609 12.3609 12.1991 12.4369 11.9938L16.1716 1.90088Z" stroke="#0D0D0D" strokeWidth="1.5"/>
                                        </svg>

                                    </button>
                                </div>

                                <div className="Frame207-4">

                                    <div className="Frame206-2">

                                        <span>{SkinCareGet[2].name}</span>

                                        <span>{SkinCareGet[2].sizeAndFit}</span>

                                    </div>

                                    <div className="Example">

                                        <span className="FramePrice">£{SkinCareGet[2].price}</span>

                                        <Link
                                            to={`/product/${SkinCareGet[2].id}`}
                                              className="Arrow1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none">
                                                <path d="M71.4142 43.4142C72.1953 42.6332 72.1953 41.3668 71.4142 40.5858L58.6863 27.8579C57.9052 27.0768 56.6389 27.0768 55.8579 27.8579C55.0768 28.6389 55.0768 29.9052 55.8579 30.6863L67.1716 42L55.8579 53.3137C55.0768 54.0948 55.0768 55.3611 55.8579 56.1421C56.6389 56.9232 57.9052 56.9232 58.6863 56.1421L71.4142 43.4142ZM14 44H70V40H14V44Z" fill="#0D0D0D"/>
                                            </svg>
                                        </Link>

                                    </div>

                                </div>

                            </div>
                        )}



                    </div>

                    <Link
                        to=""
                        className="ShopAll">show all
                    </Link>


                </div>

                {/*<div className="Frame429">*/}

                {/*    <div className="Frame424">*/}

                {/*        <div className="Frame243">*/}

                {/*            <div className="Frame199-2"></div>*/}

                {/*            <div className="Frame231"></div>*/}

                {/*        </div>*/}

                {/*        <div className="Frame234">*/}

                {/*            <div className="Frame233">*/}

                {/*                <span>your perfect match...</span>*/}

                {/*                <span>NARS’ Light Reflecting Foundation is your new go-to beauty essential, delivering a flawless complexion and perfect coverage inspired by the diversity of natural skin tones.</span>*/}

                {/*            </div>*/}

                {/*            <Link*/}
                {/*            to=""*/}
                {/*            className="BuyFoundation">buy foundation*/}

                {/*            </Link>*/}

                {/*        </div>*/}

                {/*    </div>*/}

                {/*    <div className="Frame426">*/}

                {/*        <div className="Frame223-2">*/}

                {/*            <span>and a little cover-up!</span>*/}

                {/*            <span>NARS’ Radiant Creamy Concealer is an ultimate solution for achieving a flawless, radiant complexion. Its innovative formula is designed to cater to a wide array of skin tones. Whether you need to cover blemishes, dark circles, or redness, this concealer  has got you covered.</span>*/}

                {/*        </div>*/}

                {/*        <div className="Frame425">*/}

                {/*            <Link*/}
                {/*            to=""*/}
                {/*            className="BuyConcealer">buy concealer</Link>*/}

                {/*            <div className="Frame236"></div>*/}

                {/*            <div className="Frame235"></div>*/}

                {/*        </div>*/}

                {/*    </div>*/}

                {/*</div>*/}

                <div className="footer-2">

                    <div className="Frame294">

                        <div className="LogoFull">

                            <div className="LogoDog">

                                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="72" viewBox="0 0 90 72" fill="none">
                                    <path d="M54.2399 61.2955C55.8749 63.0355 56.8799 65.308 57.0749 67.693L58.8974 67.543C58.6724 64.753 57.4874 62.0905 55.5674 60.043L54.2324 61.2955H54.2399Z" fill="#0D0D0D"/>
                                    <path d="M59.6094 60.9947C61.2969 62.7347 62.5719 64.8647 63.3069 67.1747L65.0544 66.6197C64.2369 64.0472 62.8119 61.6547 60.9294 59.7197L59.6169 60.9947H59.6094Z" fill="#0D0D0D"/>
                                    <path d="M65.2275 59.66C66.705 61.25 67.9275 63.05 68.8725 65L70.5225 64.205C69.5025 62.09 68.175 60.14 66.57 58.415L65.2275 59.66Z" fill="#0D0D0D"/>
                                    <path d="M70.6957 55.8047L69.3457 57.0422C70.5607 58.3697 71.6707 59.8022 72.6382 61.3172L74.1757 60.3272C73.1482 58.7297 71.9782 57.2072 70.6957 55.8047Z" fill="#0D0D0D"/>
                                    <path d="M41.3851 6.31296C41.1901 5.72046 40.8976 4.82796 39.9826 4.72296C39.4801 4.66296 35.6401 5.81796 34.9501 6.17796C33.1501 7.11546 31.4326 8.30046 29.8351 9.70296C27.1051 12.0955 23.8501 15.913 23.8201 20.4655L23.8051 20.518C23.7751 20.6455 23.7151 20.8555 23.7901 21.1105C23.9251 21.568 24.3676 21.8005 24.5476 21.898C25.5901 22.4455 27.4351 22.768 28.9276 23.023C29.3701 23.098 29.7826 23.173 30.1276 23.2405C31.3951 23.4955 32.6851 23.833 33.9226 24.163C34.5601 24.328 35.1976 24.5005 35.8426 24.658C36.6451 24.853 37.7026 25.108 38.7826 25.2955C38.8651 25.3105 38.9776 25.3405 39.0976 25.3705C39.4201 25.453 39.7801 25.5505 40.1176 25.5505C40.4176 25.5505 40.6951 25.4755 40.9126 25.2505C41.0926 25.063 41.2651 24.7255 41.0926 24.163C40.5676 22.423 41.0926 20.5855 41.6476 18.643C41.8126 18.0655 41.9851 17.473 42.1201 16.888C42.9151 13.5205 42.6901 9.86796 41.4826 6.59796C41.4526 6.50796 41.4151 6.41046 41.3851 6.31296Z" fill="#0D0D0D"/>
                                    <path d="M88.6424 30.2301C87.8624 29.4351 86.6625 28.9401 85.485 28.5276C81.1575 27.0126 76.0949 25.8726 71.5274 25.3626C71.8574 19.4226 69.9149 13.8651 65.9024 9.59764C64.8599 8.48764 63.6224 7.44514 62.2424 6.50764C59.1749 4.43014 53.4299 3.05014 49.6649 2.54014C49.3949 2.50264 49.3799 2.64514 49.2599 2.88514C49.1474 3.13264 49.4624 3.44764 49.6649 3.62764C52.3424 6.10264 53.8499 9.34264 55.3274 13.1226C55.6424 13.9176 55.9574 14.7426 56.1899 15.5676C56.6249 17.1276 56.7674 18.7326 56.9099 20.4276C56.9924 21.3876 57.0749 22.3851 57.2249 23.3676C57.3299 24.0876 57.4874 24.9276 57.8399 25.7226C58.6049 27.4551 60.2024 28.9551 62.4674 30.0501C63.9074 30.7476 65.6099 31.2651 67.2599 31.5276C72.0074 32.8251 76.995 33.7851 82.11 34.3851C82.9425 34.4826 83.805 34.5726 84.6749 34.5726C85.1849 34.5726 85.7024 34.5426 86.2124 34.4676C86.9324 34.3551 87.9374 34.1001 88.6274 33.5076C89.0999 33.1026 89.3624 32.5776 89.3849 32.0076C89.4149 31.3776 89.145 30.7476 88.6424 30.2376V30.2301Z" fill="#0D0D0D"/>
                                    <path d="M67.7252 32.1347C66.6302 30.9722 65.4002 29.9597 63.9227 29.2622C62.7227 28.6922 61.5302 27.8747 60.7052 26.8022C59.3402 25.0247 58.4477 21.3647 58.1627 18.5297C57.1727 8.53223 52.5602 4.57223 49.3127 2.20223C47.4227 0.814734 45.5627 0.604734 43.7627 0.694734C41.3252 0.814734 40.0352 1.93973 39.5477 4.12223C39.2402 5.50973 39.2777 5.95223 39.5852 7.10723C39.6227 7.25723 39.6677 7.40723 39.7052 7.55723C40.3202 9.94973 40.4702 12.5147 40.1327 14.9597C40.0202 15.7772 39.8552 16.5797 39.6827 17.4272C39.4427 18.6047 39.1952 19.8197 39.0902 21.0797C38.9327 23.0147 39.0902 25.7672 40.8002 27.8747L42.8777 26.1347C41.7527 24.7397 41.6552 22.7372 41.7752 21.3122C41.8652 20.2172 42.0827 19.1372 42.3152 17.9822C42.4877 17.1272 42.6677 16.2422 42.7952 15.3347C43.1852 12.5297 43.0127 9.58973 42.3002 6.85223C42.2627 6.69473 42.2177 6.53723 42.1727 6.37973C41.9252 5.45723 41.8802 4.80473 42.0377 4.09223C42.2852 3.00473 43.3952 2.33723 44.4677 2.28473C45.6452 2.23223 46.8977 2.44973 48.2927 3.46223C53.6177 7.35473 55.0952 14.7422 55.4927 18.7997C55.5977 19.8797 56.2577 25.4372 58.5902 28.4822C59.8127 30.0797 61.2827 30.8597 62.5727 31.5572C63.7127 32.1647 64.7852 32.7422 65.7002 33.8447C72.1202 41.5397 76.2752 51.8222 76.2977 60.0422H78.9827C78.9827 59.5997 78.9677 59.1647 78.9452 58.7297C78.6827 53.3372 77.0327 48.0347 74.7677 43.1897C73.5377 40.5572 72.0902 38.0297 70.4477 35.6372C69.6002 34.4147 68.7152 33.1997 67.7102 32.1272L67.7252 32.1347Z" fill="#0D0D0D"/>
                                    <path d="M54.6609 29.8391C53.0109 29.8391 51.5934 28.4516 51.0984 26.9291C50.6934 25.6841 50.7609 24.4316 50.8284 23.2166C50.8434 22.9691 50.8584 22.7216 50.8659 22.4741C50.9184 20.9816 50.7084 19.9616 50.1909 19.2866C50.1534 19.3691 50.1159 19.4666 50.0709 19.5791C49.5834 20.7416 48.8484 22.5041 47.4909 22.8041C47.0634 22.9016 46.4034 22.8791 45.7059 22.2491C44.5959 21.2441 44.6709 18.8741 44.8959 15.8891C44.9484 15.1616 45.0009 14.4791 44.9784 14.1116C44.8359 11.2016 44.5359 8.27664 44.0859 5.40414L45.8934 5.11914C46.3584 8.05164 46.6659 11.0516 46.8084 14.0216C46.8309 14.5016 46.7784 15.2066 46.7184 16.0241C46.6284 17.2241 46.3959 20.4041 46.9359 20.8916C47.0334 20.9816 47.1009 21.0116 47.1159 21.0116C47.2959 20.9666 47.6784 20.5541 48.3834 18.8666C48.4809 18.6266 48.5709 18.4241 48.6384 18.2966C48.7509 18.0791 49.0434 17.4941 49.6959 17.3066C50.3034 17.1266 50.9484 17.3666 51.4659 17.9591C52.6659 19.3316 52.7409 21.2291 52.6959 22.5416C52.6884 22.7966 52.6734 23.0591 52.6584 23.3141C52.5984 24.4091 52.5459 25.4441 52.8384 26.3666C53.1384 27.2891 54.0234 28.1591 54.8784 27.9941L55.2309 29.7866C55.0359 29.8241 54.8484 29.8391 54.6609 29.8391Z" fill="#0D0D0D"/>
                                    <path d="M37.2907 55.5645C34.4632 54.147 30.6607 54.3945 27.1882 54.627C25.2082 54.762 23.3332 54.882 21.8332 54.6945C19.4107 54.3869 18.4432 53.937 18.0007 52.587C18.5332 52.617 19.0657 52.6395 19.5982 52.6395C19.9732 52.6395 20.3407 52.632 20.7157 52.617C22.3057 52.5495 23.8807 52.377 25.4107 52.2045C29.0032 51.807 32.8807 49.6845 36.3307 50.5995L37.0207 48.2295C33.0907 47.187 28.8007 49.1295 25.1182 49.527C23.6332 49.692 22.1032 49.857 20.6032 49.9245C15.0607 50.1645 9.2107 48.3195 5.2807 46.7295C5.0632 46.6395 4.8682 46.557 4.7107 46.467C5.2882 46.242 5.9107 45.9495 6.4957 45.5895C7.5607 44.937 8.5132 44.0595 8.8882 42.9645C9.4807 41.2245 9.0007 39.087 8.8207 37.287C15.3832 36.582 22.1032 35.7495 25.5082 28.782L25.7107 28.362C26.0632 27.6195 26.4007 26.9145 26.8657 26.3895C27.8557 25.272 30.6232 23.457 31.5382 23.457V23.4045C31.0507 23.2845 30.5632 23.172 30.0757 23.0745C29.7382 23.007 29.3257 22.932 28.8757 22.857C28.3732 22.767 27.8257 22.677 27.2782 22.5645C26.1832 23.322 25.2682 24.132 24.8482 24.6045C24.1357 25.4145 23.7007 26.322 23.2807 27.1995L23.0857 27.6045C20.2732 33.357 14.3932 33.987 8.1757 34.6545C7.0507 34.7745 5.8807 34.902 4.7482 35.0595C2.4007 35.382 1.2607 36.5895 0.720702 37.5495C-0.809298 40.257 0.458201 44.1795 1.3582 46.272C1.6207 46.887 1.9432 47.6445 2.6032 48.252C3.1207 48.7245 3.7132 48.987 4.2757 49.2195C7.2682 50.427 11.3182 51.777 15.5857 52.347C16.2457 55.632 18.3007 56.562 21.5482 56.9744C23.2657 57.192 25.2532 57.0645 27.3457 56.922C31.8007 56.622 36.4132 56.3145 38.2357 59.4795C38.7157 60.312 39.2257 61.137 39.7657 62.007C41.7532 65.2094 43.8082 68.5245 44.0782 71.952L46.3732 71.772C46.0582 67.782 43.7557 64.0695 41.7232 60.792C41.1907 59.937 40.6882 59.127 40.2307 58.3245C40.1707 58.227 40.1182 58.137 40.0582 58.0395C46.4407 59.8095 51.3982 64.7895 52.4107 70.8719L54.3082 70.557C53.0032 62.7195 45.9157 56.5245 37.2982 55.557L37.2907 55.5645Z" fill="#0D0D0D"/>
                                    <path d="M36.3536 32.0451C36.4961 31.3626 36.6386 30.6801 36.7661 29.9901C36.8336 29.6526 36.9611 28.9626 36.5411 28.4226C36.2936 28.1001 35.9486 27.9651 35.6411 27.8526C33.7811 27.2001 30.6311 26.7576 28.8086 27.1851C27.9536 27.3876 27.3386 28.7226 26.5811 30.9201C25.6286 30.5076 24.7211 29.9676 23.9111 29.3151C24.1811 28.7676 24.4061 28.2276 24.5411 27.7326C24.5861 27.5526 24.6686 27.2601 24.6086 26.9376C24.5561 26.6301 24.4211 26.3601 24.2261 26.1576C23.8436 25.7451 23.2661 25.7076 22.5911 25.6551C22.3211 25.6326 22.0361 25.6176 21.7511 25.5726C21.5786 25.5501 20.7611 25.5126 20.3111 25.7226C19.9811 25.8726 19.8536 26.1576 19.7636 26.3376C19.1261 27.6651 18.5336 29.0376 18.0161 30.4176C18.0011 30.4626 17.9786 30.5151 17.9561 30.5601C17.8361 30.8526 17.6711 31.2576 17.7836 31.7151C17.8886 32.1426 18.1136 32.3301 18.2711 32.4426C18.3911 32.6676 18.5861 32.7726 18.6911 32.8326C19.1711 33.1851 19.7711 33.5601 20.4386 33.5601C20.5586 33.5601 20.6861 33.5451 20.8136 33.5151C21.6536 33.3276 22.1711 32.5326 22.5236 31.8651C22.6661 31.6026 22.8236 31.3101 23.0036 31.0026C23.0186 30.9801 23.0261 30.9651 23.0411 30.9426C23.9486 31.6401 24.9386 32.2176 26.0036 32.6601C25.8611 33.0876 25.7261 33.4851 25.6061 33.8301C25.1861 34.9851 25.2161 36.6126 27.7586 37.7751C29.5661 38.6076 31.9286 39.0201 33.0836 39.1026C33.1586 39.1026 33.2561 39.1176 33.3686 39.1176C33.6386 39.1176 33.9761 39.0801 34.2836 38.8851C34.7936 38.5551 34.9511 37.9776 35.0411 37.6401C35.3636 36.4026 35.6711 35.1576 35.9561 33.9051C40.1561 33.5451 44.4086 33.4026 48.6236 33.5001L48.6611 31.6701C44.5736 31.5801 40.4486 31.7076 36.3611 32.0376L36.3536 32.0451ZM22.9061 27.0651C22.9061 27.0651 22.9061 27.0876 22.8986 27.1026L21.4811 30.2676C21.3986 30.4551 21.2186 30.4176 21.2186 30.2151L21.0161 26.9901C21.0161 26.9901 21.0161 26.9676 21.0161 26.9526C21.0386 26.7201 21.2111 26.5326 21.3536 26.6001L22.8461 26.8101C22.9211 26.8401 22.9436 26.9601 22.9061 27.0726V27.0651ZM34.7936 29.9076L33.0761 35.6226C32.9711 35.9601 32.4986 35.9751 32.3786 35.6376L30.3686 29.7501C30.2261 29.3376 30.5711 28.9176 30.9986 28.9776L34.4936 29.4351C34.7186 29.4651 34.8611 29.6901 34.7936 29.9001V29.9076Z" fill="#0D0D0D"/>
                                </svg>
                            </div>

                            <div className="TextLogo">
                                <svg xmlns="http://www.w3.org/2000/svg" width="167" height="27" viewBox="0 0 167 27" fill="none">
                                    <path d="M3.13265 24.3928C1.69265 23.0053 0.972656 21.1453 0.972656 18.8128C0.972656 18.5203 0.995154 18.0853 1.04015 17.5003L2.97515 1.09027C2.99765 0.970275 3.05015 0.865275 3.13265 0.782775C3.21515 0.700275 3.31265 0.655273 3.42515 0.655273H8.19515C8.30765 0.655273 8.40516 0.700275 8.47266 0.782775C8.54016 0.865275 8.56265 0.970275 8.54015 1.09027L6.60515 17.5003C6.58265 17.6203 6.56765 17.8153 6.56765 18.0853C6.56765 19.0603 6.83765 19.8328 7.37765 20.4178C7.91765 21.0028 8.65266 21.2953 9.57516 21.2953C10.5652 21.2953 11.4127 20.9503 12.1177 20.2528C12.8227 19.5553 13.2277 18.6403 13.3477 17.5003L15.2827 1.09027C15.3052 0.970275 15.3577 0.865275 15.4402 0.782775C15.5227 0.700275 15.6202 0.655273 15.7327 0.655273H20.5027C20.6152 0.655273 20.7126 0.700275 20.7801 0.782775C20.8476 0.865275 20.8702 0.970275 20.8477 1.09027L18.9127 17.5003C18.7027 19.2778 18.1551 20.8453 17.2551 22.2028C16.3552 23.5678 15.1926 24.6178 13.7601 25.3603C12.3276 26.1028 10.7302 26.4703 8.95266 26.4703C6.50766 26.4703 4.56515 25.7803 3.12515 24.3928H3.13265Z" fill="#0D0D0D"/>
                                    <path d="M33.1934 25.8468L30.3959 16.1493C30.3509 16.0518 30.2834 16.0068 30.1859 16.0068H27.9734C27.8609 16.0068 27.8009 16.0668 27.8009 16.1868L26.6984 25.7418C26.6759 25.8618 26.6234 25.9668 26.5409 26.0493C26.4584 26.1318 26.3609 26.1768 26.2484 26.1768H21.4784C21.3659 26.1768 21.2684 26.1318 21.2009 26.0493C21.1334 25.9668 21.1109 25.8618 21.1334 25.7418L24.0059 1.0893C24.0059 0.969298 24.0509 0.864298 24.1409 0.781798C24.2309 0.699298 24.3359 0.654297 24.4559 0.654297H34.4159C36.4409 0.654297 38.0459 1.2618 39.2234 2.4768C40.4009 3.6918 40.9859 5.3343 40.9859 7.3968C40.9859 7.6368 40.9634 8.0268 40.9184 8.5668C40.7084 10.1943 40.1684 11.6043 39.2909 12.7968C38.4134 13.9893 37.2884 14.8518 35.9009 15.3843C35.7884 15.4368 35.7509 15.5193 35.7959 15.6393L39.0434 25.6668C39.0659 25.7193 39.0809 25.7793 39.0809 25.8468C39.0809 26.0643 38.9459 26.1768 38.6684 26.1768H33.6584C33.4259 26.1768 33.2759 26.0643 33.2084 25.8468H33.1934ZM28.9784 6.0093L28.3934 11.1843C28.3484 11.3043 28.3934 11.3643 28.5284 11.3643H32.2634C33.1634 11.3643 33.9059 11.0718 34.4909 10.4868C35.0759 9.9018 35.3759 9.1368 35.3759 8.1918C35.3759 7.4643 35.1509 6.8868 34.7009 6.4593C34.2509 6.0318 33.6434 5.8218 32.8859 5.8218H29.1884C29.0534 5.8218 28.9784 5.8818 28.9784 6.0018V6.0093Z" fill="#0D0D0D"/>
                                    <path d="M57.8453 13.12C59.4803 14.1175 60.2978 15.685 60.2978 17.8225C60.2978 18.04 60.2753 18.415 60.2303 18.955C59.9303 21.385 58.9403 23.2 57.2603 24.385C55.5803 25.5775 53.4953 26.17 51.0053 26.17H42.0878C41.9753 26.17 41.8778 26.125 41.8103 26.0425C41.7428 25.96 41.7203 25.855 41.7428 25.735L44.6153 1.08246C44.6153 0.962459 44.6603 0.85746 44.7503 0.77496C44.8403 0.69246 44.9453 0.647461 45.0653 0.647461H53.7053C56.1728 0.647461 58.0478 1.11246 59.3228 2.03496C60.6053 2.95746 61.2428 4.44246 61.2428 6.48246C61.2428 6.75246 61.2203 7.17246 61.1753 7.75746C60.8753 10.165 59.7803 11.875 57.8903 12.895C57.7553 12.97 57.7403 13.0375 57.8528 13.1125L57.8453 13.12ZM53.9228 20.155C54.4853 19.6225 54.7703 18.88 54.7703 17.9275C54.7703 17.2225 54.5528 16.6825 54.1103 16.3075C53.6753 15.9325 53.0378 15.745 52.2053 15.745H48.6128C48.5003 15.745 48.4403 15.805 48.4403 15.925L47.8553 20.7775C47.8553 20.8975 47.9153 20.9575 48.0278 20.9575H51.5903C52.5803 20.9575 53.3603 20.6875 53.9228 20.155ZM49.5803 6.00996L49.0628 10.6075C49.0178 10.7275 49.0628 10.7875 49.1978 10.7875H52.5203C53.4428 10.7875 54.1703 10.5775 54.6953 10.15C55.2278 9.72246 55.5503 9.12246 55.6628 8.34246C55.7528 7.53996 55.5803 6.91746 55.1453 6.48246C54.7103 6.04746 54.0278 5.82996 53.1053 5.82996H49.7828C49.6478 5.82996 49.5728 5.88996 49.5728 6.00996H49.5803Z" fill="#0D0D0D"/>
                                    <path d="M78.7783 0.781798C78.8608 0.699298 78.9583 0.654297 79.0708 0.654297H83.8408C83.9533 0.654297 84.0508 0.699298 84.1183 0.781798C84.1858 0.864298 84.2083 0.969298 84.1858 1.0893L81.3133 25.7418C81.2908 25.8618 81.2383 25.9668 81.1558 26.0493C81.0733 26.1318 80.9758 26.1768 80.8633 26.1768H76.3033C76.0708 26.1768 75.9208 26.0793 75.8533 25.8843L69.7708 11.9568C69.7258 11.8818 69.6808 11.8518 69.6358 11.8668C69.5908 11.8818 69.5683 11.9343 69.5683 12.0318L68.0158 25.7418C67.9933 25.8618 67.9408 25.9668 67.8583 26.0493C67.7758 26.1318 67.6783 26.1768 67.5658 26.1768H62.7958C62.6833 26.1768 62.5858 26.1318 62.5183 26.0493C62.4508 25.9668 62.4283 25.8618 62.4508 25.7418L65.3233 1.0893C65.3233 0.969298 65.3683 0.864298 65.4583 0.781798C65.5483 0.699298 65.6533 0.654297 65.7733 0.654297H70.3708C70.5808 0.654297 70.7158 0.751796 70.7833 0.946796L76.8658 14.8368C76.8883 14.9118 76.9258 14.9418 76.9708 14.9268C77.0158 14.9118 77.0533 14.8593 77.0758 14.7618L78.6283 1.0893C78.6508 0.969298 78.7033 0.864298 78.7858 0.781798H78.7783Z" fill="#0D0D0D"/>
                                    <path d="M89.3224 25.3373C87.9274 24.5873 86.8474 23.5148 86.0749 22.1273C85.3024 20.7398 84.9199 19.1348 84.9199 17.3123V9.4373C84.9199 7.6373 85.3024 6.0548 86.0749 4.6823C86.8474 3.3098 87.9274 2.2448 89.3224 1.4948C90.7174 0.744803 92.3374 0.362305 94.1824 0.362305C96.0274 0.362305 97.6474 0.722305 99.0424 1.4348C100.437 2.1548 101.517 3.15981 102.29 4.46481C103.062 5.76231 103.445 7.26981 103.445 8.96481C103.445 9.08481 103.407 9.18231 103.325 9.25731C103.242 9.3323 103.145 9.3698 103.032 9.3698L98.1199 9.69981C97.8424 9.69981 97.7074 9.56481 97.7074 9.30231C97.7074 8.16231 97.3849 7.2473 96.7399 6.56481C96.0949 5.88231 95.2399 5.5448 94.1824 5.5448C93.1249 5.5448 92.2699 5.8898 91.6249 6.5873C90.9799 7.2773 90.6574 8.18481 90.6574 9.30231V17.5823C90.6574 18.6998 90.9799 19.5998 91.6249 20.2823C92.2699 20.9648 93.1249 21.3023 94.1824 21.3023C95.2399 21.3023 96.0949 20.9648 96.7399 20.2823C97.3849 19.5998 97.7074 18.6998 97.7074 17.5823C97.7074 17.3123 97.8424 17.1848 98.1199 17.1848L103.032 17.4398C103.145 17.4398 103.242 17.4773 103.325 17.5523C103.407 17.6273 103.445 17.7098 103.445 17.8073C103.445 19.5323 103.055 21.0548 102.29 22.3673C101.517 23.6798 100.437 24.6923 99.0424 25.4123C97.6474 26.1323 96.0274 26.4848 94.1824 26.4848C92.3374 26.4848 90.7174 26.1098 89.3224 25.3523V25.3373Z" fill="#0D0D0D"/>
                                    <path d="M110.443 25.3898C109.026 24.6023 107.923 23.4848 107.143 22.0523C106.356 20.6198 105.966 18.9548 105.966 17.0573V9.76731C105.966 7.92231 106.356 6.2873 107.143 4.8623C107.923 3.4373 109.026 2.33481 110.443 1.54731C111.861 0.759806 113.503 0.362305 115.371 0.362305C117.238 0.362305 118.888 0.759806 120.313 1.54731C121.746 2.33481 122.848 3.4448 123.636 4.8623C124.416 6.2873 124.813 7.92231 124.813 9.76731V17.0573C124.813 18.9548 124.423 20.6198 123.636 22.0523C122.848 23.4848 121.746 24.6023 120.313 25.3898C118.881 26.1773 117.238 26.5748 115.371 26.5748C113.503 26.5748 111.861 26.1773 110.443 25.3898ZM118.048 20.2673C118.731 19.5173 119.068 18.5048 119.068 17.2373V9.6923C119.068 8.4548 118.731 7.4498 118.048 6.6848C117.366 5.91981 116.473 5.53731 115.371 5.53731C114.268 5.53731 113.406 5.91981 112.723 6.6848C112.041 7.4498 111.703 8.4548 111.703 9.6923V17.2373C111.703 18.5048 112.041 19.5098 112.723 20.2673C113.406 21.0248 114.283 21.3998 115.371 21.3998C116.458 21.3998 117.373 21.0248 118.048 20.2673Z" fill="#0D0D0D"/>
                                    <path d="M140.293 25.8468L136.213 16.1493C136.168 16.0518 136.1 16.0068 136.003 16.0068H133.723C133.61 16.0068 133.55 16.0668 133.55 16.1868V25.7418C133.55 25.8618 133.512 25.9668 133.43 26.0493C133.347 26.1318 133.25 26.1768 133.138 26.1768H128.225C128.112 26.1768 128.015 26.1318 127.933 26.0493C127.85 25.9668 127.812 25.8618 127.812 25.7418V1.0893C127.812 0.969298 127.85 0.864298 127.933 0.781798C128.015 0.699298 128.112 0.654297 128.225 0.654297H138.492C140.015 0.654297 141.35 0.984298 142.505 1.6368C143.66 2.2968 144.553 3.2268 145.183 4.4268C145.813 5.6268 146.135 7.0068 146.135 8.5668C146.135 10.1268 145.753 11.6043 144.995 12.7968C144.238 13.9893 143.173 14.8518 141.815 15.3843C141.703 15.4368 141.665 15.5193 141.71 15.6393L146.27 25.6668C146.315 25.7643 146.338 25.8393 146.338 25.8843C146.338 26.0793 146.21 26.1768 145.955 26.1768H140.765C140.532 26.1768 140.375 26.0643 140.277 25.8468H140.293ZM133.55 6.0093V11.1843C133.55 11.3043 133.61 11.3643 133.723 11.3643H137.562C138.417 11.3643 139.107 11.1168 139.64 10.6143C140.172 10.1118 140.435 9.4518 140.435 8.6268C140.435 7.8018 140.172 7.0968 139.64 6.5868C139.107 6.0768 138.417 5.8218 137.562 5.8218H133.723C133.61 5.8218 133.55 5.8818 133.55 6.0018V6.0093Z" fill="#0D0D0D"/>
                                    <path d="M166.108 5.7018C166.025 5.7843 165.928 5.8293 165.815 5.8293H154.963C154.85 5.8293 154.79 5.8893 154.79 6.0093V10.4943C154.79 10.6143 154.85 10.6743 154.963 10.6743H161.915C162.028 10.6743 162.125 10.7193 162.208 10.8018C162.29 10.8843 162.328 10.9893 162.328 11.1093V15.3768C162.328 15.4968 162.29 15.6018 162.208 15.6843C162.125 15.7668 162.028 15.8118 161.915 15.8118H154.963C154.85 15.8118 154.79 15.8718 154.79 15.9918V20.8068C154.79 20.9268 154.85 20.9868 154.963 20.9868H165.815C165.928 20.9868 166.025 21.0318 166.108 21.1143C166.19 21.1968 166.228 21.3018 166.228 21.4218V25.7268C166.228 25.8468 166.19 25.9518 166.108 26.0343C166.025 26.1168 165.928 26.1618 165.815 26.1618H149.465C149.353 26.1618 149.255 26.1168 149.173 26.0343C149.09 25.9518 149.053 25.8468 149.053 25.7268V1.0893C149.053 0.969298 149.09 0.864298 149.173 0.781798C149.255 0.699298 149.353 0.654297 149.465 0.654297H165.815C165.928 0.654297 166.025 0.699298 166.108 0.781798C166.19 0.864298 166.228 0.969298 166.228 1.0893V5.3943C166.228 5.5143 166.19 5.6193 166.108 5.7018Z" fill="#0D0D0D"/>
                                </svg>
                            </div>
                        </div>

                        <div className="Frame283">

                            <button className="Button_socials">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                    <g clipPath="url(#clip0_88_3906)">
                                        <path d="M12 2.84062C15.2063 2.84062 15.5859 2.85469 16.8469 2.91094C18.0188 2.9625 18.6516 3.15938 19.0734 3.32344C19.6313 3.53906 20.0344 3.80156 20.4516 4.21875C20.8734 4.64062 21.1313 5.03906 21.3469 5.59688C21.5109 6.01875 21.7078 6.65625 21.7594 7.82344C21.8156 9.08906 21.8297 9.46875 21.8297 12.6703C21.8297 15.8766 21.8156 16.2563 21.7594 17.5172C21.7078 18.6891 21.5109 19.3219 21.3469 19.7438C21.1313 20.3016 20.8687 20.7047 20.4516 21.1219C20.0297 21.5438 19.6313 21.8016 19.0734 22.0172C18.6516 22.1813 18.0141 22.3781 16.8469 22.4297C15.5813 22.4859 15.2016 22.5 12 22.5C8.79375 22.5 8.41406 22.4859 7.15313 22.4297C5.98125 22.3781 5.34844 22.1813 4.92656 22.0172C4.36875 21.8016 3.96563 21.5391 3.54844 21.1219C3.12656 20.7 2.86875 20.3016 2.65313 19.7438C2.48906 19.3219 2.29219 18.6844 2.24063 17.5172C2.18438 16.2516 2.17031 15.8719 2.17031 12.6703C2.17031 9.46406 2.18438 9.08437 2.24063 7.82344C2.29219 6.65156 2.48906 6.01875 2.65313 5.59688C2.86875 5.03906 3.13125 4.63594 3.54844 4.21875C3.97031 3.79688 4.36875 3.53906 4.92656 3.32344C5.34844 3.15938 5.98594 2.9625 7.15313 2.91094C8.41406 2.85469 8.79375 2.84062 12 2.84062ZM12 0.679688C8.74219 0.679688 8.33438 0.69375 7.05469 0.75C5.77969 0.80625 4.90313 1.0125 4.14375 1.30781C3.35156 1.61719 2.68125 2.025 2.01563 2.69531C1.34531 3.36094 0.9375 4.03125 0.628125 4.81875C0.332812 5.58281 0.126563 6.45469 0.0703125 7.72969C0.0140625 9.01406 0 9.42188 0 12.6797C0 15.9375 0.0140625 16.3453 0.0703125 17.625C0.126563 18.9 0.332812 19.7766 0.628125 20.5359C0.9375 21.3281 1.34531 21.9984 2.01563 22.6641C2.68125 23.3297 3.35156 23.7422 4.13906 24.0469C4.90313 24.3422 5.775 24.5484 7.05 24.6047C8.32969 24.6609 8.7375 24.675 11.9953 24.675C15.2531 24.675 15.6609 24.6609 16.9406 24.6047C18.2156 24.5484 19.0922 24.3422 19.8516 24.0469C20.6391 23.7422 21.3094 23.3297 21.975 22.6641C22.6406 21.9984 23.0531 21.3281 23.3578 20.5406C23.6531 19.7766 23.8594 18.9047 23.9156 17.6297C23.9719 16.35 23.9859 15.9422 23.9859 12.6844C23.9859 9.42656 23.9719 9.01875 23.9156 7.73906C23.8594 6.46406 23.6531 5.5875 23.3578 4.82812C23.0625 4.03125 22.6547 3.36094 21.9844 2.69531C21.3188 2.02969 20.6484 1.61719 19.8609 1.3125C19.0969 1.01719 18.225 0.810938 16.95 0.754688C15.6656 0.69375 15.2578 0.679688 12 0.679688Z" fill="#000100"/>
                                        <path d="M12 6.51562C8.59688 6.51562 5.83594 9.27656 5.83594 12.6797C5.83594 16.0828 8.59688 18.8438 12 18.8438C15.4031 18.8438 18.1641 16.0828 18.1641 12.6797C18.1641 9.27656 15.4031 6.51562 12 6.51562ZM12 16.6781C9.79219 16.6781 8.00156 14.8875 8.00156 12.6797C8.00156 10.4719 9.79219 8.68125 12 8.68125C14.2078 8.68125 15.9984 10.4719 15.9984 12.6797C15.9984 14.8875 14.2078 16.6781 12 16.6781Z" fill="#000100"/>
                                        <path d="M19.8469 6.27207C19.8469 7.06895 19.2 7.71114 18.4078 7.71114C17.6109 7.71114 16.9688 7.06426 16.9688 6.27207C16.9688 5.4752 17.6156 4.83301 18.4078 4.83301C19.2 4.83301 19.8469 5.47988 19.8469 6.27207Z" fill="#000100"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_88_3906">
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.679688)"/>
                                        </clipPath>
                                    </defs>
                                </svg>

                            </button>

                            <button className="Button_socials">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                    <g clipPath="url(#clip0_88_3911)">
                                        <path d="M24 12.6797C24 6.05233 18.6274 0.679688 12 0.679688C5.37264 0.679688 0 6.05233 0 12.6797C0 18.3072 3.87456 23.0294 9.10128 24.3264V16.3469H6.62688V12.6797H9.10128V11.0995C9.10128 7.01521 10.9498 5.12209 14.9597 5.12209C15.72 5.12209 17.0318 5.27137 17.5685 5.42017V8.74417C17.2853 8.71441 16.7933 8.69953 16.1822 8.69953C14.2147 8.69953 13.4544 9.44497 13.4544 11.3827V12.6797H17.3741L16.7006 16.3469H13.4544V24.5918C19.3963 23.8742 24.0005 18.815 24.0005 12.6797H24Z" fill="#0866FF"/>
                                        <path d="M16.6997 16.3469L17.3732 12.6797H13.4535V11.3827C13.4535 9.44495 14.2138 8.69951 16.1813 8.69951C16.7924 8.69951 17.2844 8.71439 17.5676 8.74415V5.42015C17.0309 5.27087 15.7191 5.12207 14.9588 5.12207C10.9489 5.12207 9.10038 7.01519 9.10038 11.0995V12.6797H6.62598V16.3469H9.10038V24.3264C10.0287 24.5568 10.9997 24.6797 11.9991 24.6797C12.4911 24.6797 12.9764 24.6494 13.453 24.5918V16.3469H16.6993H16.6997Z" fill="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_88_3911">
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.679688)"/>
                                        </clipPath>
                                    </defs>
                                </svg>

                            </button>

                            <button className="Button_socials">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                    <g clipPath="url(#clip0_88_3915)">
                                        <path d="M12 24.6797C18.6274 24.6797 24 19.3071 24 12.6797C24 6.05227 18.6274 0.679688 12 0.679688C5.37258 0.679688 0 6.05227 0 12.6797C0 19.3071 5.37258 24.6797 12 24.6797Z" fill="white"/>
                                        <path d="M12 0.679688C5.37284 0.679688 0 6.05253 0 12.6797C0 17.7661 3.16049 22.1118 7.62469 23.8599C7.51605 22.9118 7.42716 21.4501 7.6642 20.413C7.88148 19.4747 9.06667 14.4476 9.06667 14.4476C9.06667 14.4476 8.71111 13.7266 8.71111 12.6698C8.71111 11.0007 9.67901 9.75623 10.884 9.75623C11.9111 9.75623 12.4049 10.5266 12.4049 11.4451C12.4049 12.4723 11.7531 14.013 11.4074 15.4451C11.121 16.6402 12.0099 17.618 13.1852 17.618C15.3185 17.618 16.958 15.3661 16.958 12.1266C16.958 9.25253 14.8938 7.24759 11.9407 7.24759C8.52346 7.24759 6.51852 9.80561 6.51852 12.4525C6.51852 13.4797 6.91358 14.5859 7.40741 15.1883C7.50617 15.3068 7.51605 15.4155 7.48642 15.534C7.39753 15.9093 7.19012 16.7291 7.15062 16.897C7.10123 17.1143 6.97284 17.1636 6.74568 17.055C5.24444 16.3538 4.30617 14.171 4.30617 12.4031C4.30617 8.62043 7.05185 5.14389 12.237 5.14389C16.3951 5.14389 19.6346 8.10685 19.6346 12.0772C19.6346 16.2155 17.0272 19.5439 13.4123 19.5439C12.1975 19.5439 11.0519 18.9118 10.6667 18.1612C10.6667 18.1612 10.0642 20.4525 9.91605 21.0155C9.64938 22.0624 8.91852 23.3661 8.42469 24.1661C9.55062 24.5118 10.7358 24.6994 11.9802 24.6994C18.6074 24.6994 23.9802 19.3266 23.9802 12.6994C24 6.05253 18.6272 0.679688 12 0.679688Z" fill="#E60019"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_88_3915">
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.679688)"/>
                                        </clipPath>
                                    </defs>
                                </svg>

                            </button>


                            <button className="Button_socials">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                    <path d="M17.1762 9.34316C18.7196 10.4503 20.6102 11.1018 22.6523 11.1018V7.1583C22.2658 7.15838 21.8803 7.11794 21.5023 7.03755V10.1416C19.4604 10.1416 17.57 9.49018 16.0262 8.38309V16.4306C16.0262 20.4563 12.7743 23.7196 8.76309 23.7196C7.26641 23.7196 5.87531 23.2655 4.71973 22.4867C6.03864 23.8401 7.87796 24.6797 9.91285 24.6797C13.9243 24.6797 17.1764 21.4164 17.1764 17.3905V9.34316H17.1762ZM18.5949 5.36468C17.8061 4.49991 17.2883 3.38236 17.1762 2.14686V1.63965H16.0864C16.3607 3.20997 17.2964 4.55156 18.5949 5.36468ZM7.25681 19.3975C6.81614 18.8176 6.578 18.1083 6.57907 17.3789C6.57907 15.5377 8.06647 14.0448 9.90153 14.0448C10.2435 14.0447 10.5835 14.0973 10.9094 14.2011V10.1695C10.5285 10.1171 10.1441 10.0948 9.75986 10.103V13.241C9.4337 13.1372 9.0936 13.0845 8.75152 13.0848C6.91646 13.0848 5.42914 14.5776 5.42914 16.419C5.42914 17.7211 6.1726 18.8484 7.25681 19.3975Z" fill="#FF004F"/>
                                    <path d="M16.0269 8.38301C17.5707 9.4901 19.4611 10.1415 21.503 10.1415V7.03747C20.3632 6.79383 19.3543 6.19609 18.5956 5.36468C17.2971 4.55148 16.3615 3.20989 16.0872 1.63965H13.2246V17.3903C13.2181 19.2265 11.7332 20.7133 9.90211 20.7133C8.82306 20.7133 7.86443 20.1971 7.25731 19.3975C6.17318 18.8484 5.42972 17.721 5.42972 16.4191C5.42972 14.5778 6.91704 13.0849 8.7521 13.0849C9.10369 13.0849 9.44256 13.1398 9.76044 13.2411V10.1031C5.8197 10.1848 2.65039 13.4162 2.65039 17.3904C2.65039 19.3743 3.43962 21.1727 4.72055 22.4868C5.87614 23.2655 7.26724 23.7197 8.76391 23.7197C12.7752 23.7197 16.027 20.4562 16.027 16.4306V8.38301H16.0269Z" fill="black"/>
                                    <path d="M21.5025 7.03749V6.19817C20.4748 6.19974 19.4672 5.91088 18.5952 5.36462C19.3671 6.21275 20.3835 6.79755 21.5025 7.03749ZM16.0867 1.63967C16.0605 1.4896 16.0404 1.33854 16.0265 1.1869V0.679688H12.074V16.4305C12.0677 18.2665 10.5829 19.7533 8.75164 19.7533C8.214 19.7533 7.70638 19.6252 7.25685 19.3976C7.86397 20.1971 8.82259 20.7132 9.90164 20.7132C11.7326 20.7132 13.2177 19.2266 13.2241 17.3904V1.63967H16.0867ZM9.76014 10.1031V9.20958C9.42988 9.16428 9.09691 9.14154 8.76353 9.14171C4.75192 9.14163 1.5 12.4051 1.5 16.4305C1.5 18.9542 2.77806 21.1784 4.72017 22.4867C3.43924 21.1727 2.65001 19.3741 2.65001 17.3903C2.65001 13.4162 5.81924 10.1848 9.76014 10.1031Z" fill="#00F2EA"/>
                                </svg>

                            </button>

                            <button className="Button_socials">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                    <path d="M22.2974 18.3593C18.5809 16.5597 17.9885 13.7811 17.9622 13.575C17.9303 13.3254 17.8941 13.1291 18.1694 12.8752C18.4349 12.6298 19.6129 11.9005 19.9397 11.6723C20.4799 11.2945 20.7179 10.9173 20.5425 10.4535C20.4198 10.1328 20.1212 10.0119 19.8067 10.0119C19.7074 10.0122 19.6085 10.0233 19.5117 10.045C18.9181 10.1738 18.3417 10.4713 18.0082 10.5517C17.9681 10.562 17.9269 10.5676 17.8855 10.5682C17.7077 10.5682 17.6403 10.4891 17.6574 10.2751C17.6991 9.6261 17.7874 8.35948 17.685 7.17628C17.5446 5.54838 17.0197 4.7418 16.3973 4.02844C16.0962 3.6825 14.6982 2.19629 12.0001 2.19629C9.30207 2.19629 7.90583 3.6825 7.60659 4.02415C6.98236 4.7375 6.45808 5.54409 6.31889 7.17199C6.21649 8.35519 6.30846 9.6212 6.34648 10.2708C6.35875 10.4744 6.2962 10.564 6.11837 10.564C6.07699 10.5632 6.03583 10.5577 5.99574 10.5474C5.66277 10.467 5.08637 10.1696 4.4928 10.0407C4.39598 10.019 4.29708 10.0079 4.19786 10.0076C3.88206 10.0076 3.58467 10.1303 3.46203 10.4493C3.28665 10.913 3.52335 11.2902 4.06541 11.668C4.39224 11.8962 5.57018 12.6249 5.83569 12.8709C6.1104 13.1248 6.07484 13.3211 6.04295 13.5707C6.01658 13.7799 5.42363 16.5585 1.70768 18.355C1.49 18.4605 1.11963 18.6838 1.77268 19.0445C2.79794 19.6112 3.48042 19.5505 4.01083 19.8922C4.46092 20.1823 4.19479 20.8079 4.52224 21.0337C4.92449 21.3115 6.11347 21.014 7.64951 21.5213C8.93722 21.9457 9.71965 23.1449 12.0032 23.1449C14.2867 23.1449 15.0918 21.9402 16.3568 21.5213C17.8898 21.014 19.0813 21.3115 19.4841 21.0337C19.8109 20.8079 19.5454 20.1823 19.9955 19.8922C20.5259 19.5505 21.2078 19.6112 22.2337 19.0445C22.8855 18.6881 22.5151 18.4648 22.2974 18.3593Z" fill="white"/>
                                    <path d="M23.9142 18.148C23.7474 17.6941 23.4298 17.4512 23.068 17.25C22.9999 17.2101 22.9374 17.1782 22.884 17.1537C22.7761 17.0979 22.6657 17.0439 22.556 16.9869C21.4283 16.3888 20.5478 15.6344 19.937 14.7401C19.7636 14.4883 19.6132 14.2214 19.4876 13.9427C19.4354 13.7936 19.4379 13.709 19.4753 13.6317C19.5124 13.5722 19.5615 13.521 19.6194 13.4814C19.8132 13.3532 20.0131 13.2232 20.1486 13.1355C20.3902 12.9791 20.5815 12.8552 20.7048 12.7675C21.1677 12.4436 21.4915 12.0995 21.6938 11.7149C21.835 11.4492 21.9173 11.1562 21.9352 10.8558C21.9531 10.5555 21.9061 10.2547 21.7975 9.97415C21.4909 9.16695 20.7287 8.66583 19.8052 8.66583C19.6104 8.66564 19.4162 8.6862 19.2257 8.72716C19.1748 8.7382 19.1239 8.74986 19.0743 8.76274C19.0829 8.2107 19.0706 7.62799 19.0215 7.05449C18.8474 5.03832 18.1416 3.98148 17.4058 3.1387C16.9346 2.61058 16.3796 2.16378 15.763 1.81626C14.6464 1.17835 13.3802 0.854492 11.9999 0.854492C10.6196 0.854492 9.35948 1.17835 8.24163 1.81626C7.6236 2.16388 7.06746 2.61158 6.59582 3.14116C5.85999 3.98393 5.15421 5.04262 4.98006 7.05694C4.931 7.63045 4.91874 8.21622 4.92671 8.76519C4.87704 8.75231 4.82676 8.74066 4.77587 8.72962C4.58543 8.68866 4.39118 8.6681 4.1964 8.66828C3.27232 8.66828 2.50889 9.16941 2.20353 9.97661C2.09437 10.2573 2.04691 10.5582 2.06437 10.8589C2.08183 11.1596 2.1638 11.453 2.3047 11.7192C2.50767 12.1038 2.83143 12.4479 3.29439 12.7718C3.41703 12.8576 3.60896 12.9815 3.85056 13.1398C3.98117 13.2244 4.17187 13.3483 4.3589 13.4722C4.42433 13.5146 4.47995 13.5704 4.522 13.636C4.56125 13.7164 4.56248 13.8028 4.50422 13.9623C4.38032 14.2352 4.23236 14.4965 4.06211 14.7431C3.46486 15.6172 2.61007 16.3582 1.51859 16.9513C0.94035 17.258 0.339422 17.4629 0.0855607 18.1529C-0.105755 18.6737 0.0193358 19.2662 0.505597 19.7655C0.684059 19.9518 0.891048 20.1086 1.11879 20.2298C1.59266 20.4903 2.09654 20.6919 2.61927 20.8303C2.72714 20.8581 2.82955 20.9039 2.92219 20.9658C3.0994 21.121 3.07426 21.3547 3.31034 21.697C3.42884 21.8739 3.57942 22.027 3.75429 22.1484C4.24975 22.4907 4.80653 22.5122 5.39642 22.5349C5.92928 22.5551 6.53327 22.5784 7.22311 22.806C7.50886 22.9004 7.80565 23.0832 8.14965 23.2967C8.97562 23.8045 10.1063 24.4995 11.9987 24.4995C13.891 24.4995 15.0297 23.8009 15.8618 23.2911C16.2033 23.0814 16.4983 22.9004 16.776 22.8084C17.4659 22.5802 18.0699 22.5575 18.6027 22.5373C19.1926 22.5146 19.7494 22.4931 20.2449 22.1509C20.452 22.0064 20.6245 21.8179 20.7501 21.5988C20.92 21.3099 20.9157 21.1081 21.0751 20.9671C21.162 20.9081 21.2582 20.8642 21.3596 20.837C21.8895 20.6983 22.4003 20.4947 22.8804 20.231C23.1223 20.1012 23.3401 19.9306 23.5242 19.7268L23.5303 19.7195C23.9866 19.2312 24.1012 18.6559 23.9142 18.148ZM22.2322 19.0521C21.2063 19.6189 20.5245 19.5581 19.9941 19.8998C19.5434 20.1899 19.8101 20.8156 19.4827 21.0413C19.0804 21.3191 17.8914 21.0217 16.3554 21.5289C15.0885 21.9479 14.2803 23.1525 12.0017 23.1525C9.7231 23.1525 8.93392 21.9503 7.64622 21.5259C6.11324 21.0186 4.92181 21.3161 4.51894 21.0382C4.19211 20.8125 4.45762 20.1869 4.00754 19.8967C3.47651 19.5551 2.79464 19.6158 1.76939 19.0521C1.11634 18.6914 1.4867 18.4682 1.70439 18.3627C5.42033 16.563 6.01329 13.7844 6.03965 13.5783C6.07154 13.3287 6.10711 13.1324 5.8324 12.8785C5.56688 12.6331 4.38894 11.9038 4.06211 11.6757C3.52128 11.2978 3.28336 10.9206 3.45873 10.4569C3.58137 10.1361 3.88061 10.0153 4.19456 10.0153C4.29379 10.0156 4.39268 10.0267 4.4895 10.0484C5.08307 10.1772 5.65948 10.4747 5.99244 10.555C6.03253 10.5653 6.07369 10.5709 6.11508 10.5716C6.2929 10.5716 6.35545 10.482 6.34318 10.2784C6.30517 9.62883 6.21319 8.36282 6.31559 7.17962C6.45601 5.55172 6.98029 4.74513 7.60329 4.03178C7.90253 3.6889 9.30858 2.20269 11.9974 2.20269C14.6863 2.20269 16.096 3.68277 16.3952 4.02442C17.0189 4.73777 17.5437 5.54436 17.6829 7.17226C17.7853 8.35546 17.697 9.62208 17.6553 10.271C17.6412 10.4851 17.7056 10.5642 17.8835 10.5642C17.9248 10.5636 17.966 10.558 18.0061 10.5477C18.3397 10.4673 18.9161 10.1698 19.5096 10.041C19.6065 10.0193 19.7054 10.0082 19.8046 10.0079C20.1204 10.0079 20.4178 10.1306 20.5404 10.4495C20.7158 10.9132 20.4791 11.2905 19.9377 11.6683C19.6108 11.8965 18.4329 12.6252 18.1674 12.8711C17.892 13.1251 17.9282 13.3213 17.9601 13.571C17.9865 13.7801 18.5788 16.5587 22.2954 18.3553C22.5149 18.4651 22.8853 18.6884 22.2322 19.0521Z" fill="black"/>
                                </svg>

                            </button>


                        </div>

                    </div>

                    <div className="Frame290">

                        <div className="Frame284">

                            <span>HELP & INFORMATION</span>

                            <Link
                                className="Special-Link" to=""> Help
                            </Link>

                            <Link
                                to=""
                                className="Special-Link">Track order
                            </Link>

                            <Link
                                to=""
                                className="Special-Link">Delivery & returns

                            </Link>

                            <Link
                                to=""
                                className="Special-Link">10% Student Discount
                            </Link>

                            <Link
                                to=""
                                className="Special-Link">popular faqs
                            </Link>

                        </div>

                        <div className="Frame286">

                            <span>about</span>

                            <Link
                                className="Special-Link" to=""> About us
                            </Link>

                            <Link
                                to=""
                                className="Special-Link">Careers at urbncore
                            </Link>

                            <Link
                                to=""
                                className="Special-Link">Corporate responsibility

                            </Link>

                            <Link
                                to=""
                                className="Special-Link">Investors' site
                            </Link>

                            <Link
                                to=""
                                className="Special-Link">Cyber Security
                            </Link>

                        </div>

                        <div className="Frame287">

                            <span>other</span>

                            <Link
                                className="Special-Link" to="">privacy policy
                            </Link>

                            <Link
                                to=""
                                className="Special-Link">terms of service
                            </Link>

                            <Link
                                to=""
                                className="Special-Link">contact us

                            </Link>

                            <Link
                                to=""
                                className="Special-Link">help center
                            </Link>

                            <Link
                                to=""
                                className="Special-Link">Cyber Security
                            </Link>

                        </div>

                    </div>

                </div>

            </section>
        </>
    )
}

export default FaceBody;