import { ChangeEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import http from "../../../http_common";
import { AuthUserActionType } from "../../authentication/type";
import { IUser } from "../../authentication/login/type";
import "../Style-UserProfile.css";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import "@fontsource/outfit";
import { BsArrowReturnLeft } from "react-icons/bs";
import { PiStarFour } from "react-icons/pi";
import { FiHome } from "react-icons/fi";
import { FiCreditCard } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { IoGiftOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { PiSignOutFill } from "react-icons/pi";
import {API_URL} from "../../../utils/getEnvData.ts";
const DefaultSideBar = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.user);

    const baseUrl=API_URL;

    const init: IUser = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        image: "",
        roles: "",
        IsLockedOut: false
    };

    const [user, setUser] = useState<IUser>(init);

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
        }
    }, [currentUser]);

    const beforeUpload = (file: File) => {
        const isImage = /^image\/\w+/.test(file.type);
        if (!isImage) {
            console.log('Оберіть файл зображення!');
            return false;
        }
        const isLt10M = file.size / 1024 / 1024 < 10; // Можливо, ви мали на увазі 10MB замість 2MB
        if (!isLt10M) {
            console.log('Розмір файлу не повинен перевищувати 10MB!');
            return false;
        }
        console.log("is select", isImage && isLt10M);
        return isImage && isLt10M;
    };

    const handleChangeImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const files = e.target.files;

        if (!files || files.length === 0) {
            return;
        }
        const file = files[0];

        if (!beforeUpload(file)) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('Image', file);

            const resp = await http.post(`api/uploadAvatar/UpdateAvatar`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const newImage = resp.data;

            dispatch({
                type: AuthUserActionType.UPDATE_USER,
                payload: {
                    image: newImage
                }
            });

            console.log("Прийшло фото", resp.data);

        } catch (error) {
            console.error('Помилка з фото User:', error);
        }
    };

    return (
        <>


            <div className="main-container">
                <div>
                    <div className="img-div">
                        <div className="image-container">
                            <label htmlFor="pickFoto" className="image-label">

                                {user.image ? (
                                    <div className="placeholder">
                                        <img src={`${baseUrl}avatars/${user.image}`}/>
                                    </div>
                                ) : (
                                    <div className="placeholder">
                                        <MdOutlinePhotoCamera size={32}/>
                                    </div>
                                )}

                            </label>
                            <input
                                id="pickFoto"
                                accept="image/*"
                                type="file"
                                name="image"
                                onChange={handleChangeImage}
                                className="file-input"
                                style={{display: 'none'}} // Приховуємо вхідний файл
                            />
                        </div>
                        <div className="divtext-sidebar">
                            <div className="text-container">
                                <p className="text-hi">Hi there,</p>
                                <p className="text-name">{`${user.firstName} ${user.lastName}`}</p>
                            </div>
                            <button className="edit-button">
                                <FaEdit size={24}/>
                            </button>
                        </div>
                    </div>

                    <div className="second-block">
                        <button className="button-in-block">
                            <LuPackage size={24}/>
                            <p className="text-name">My Orders</p>
                        </button>
                        <button className="button-in-block">
                            <BsArrowReturnLeft size={24}/>
                            <p className="text-name">Returns</p>
                        </button>
                        <button className="button-in-block">
                            <PiStarFour size={24}/>
                            <p className="text-name">Favourites</p>
                        </button>
                        <button className="button-in-block">
                            <FiHome size={24}/>
                            <p className="text-name">Address Information</p>
                        </button>
                        <button className="button-in-block">
                            <FiCreditCard size={24}/>
                            <p className="text-name">Payment Method</p>
                        </button>
                        <button className="button-in-block">
                            <FiMessageCircle size={24}/>
                            <p className="text-name">Mailing Preferences</p>
                        </button>
                        <button className="button-in-block">
                            <GoPeople size={24}/>
                            <p className="text-name">Socials</p>
                        </button>
                        <button className="button-in-block">
                            <IoGiftOutline size={24}/>
                            <p className="text-name">Gift Cards</p>
                        </button>
                        <button className="button-in-block">
                            <IoIosInformationCircleOutline size={24}/>
                            <p className="text-name">Help Centre</p>
                        </button>
                    </div>
                    <button className="sign-out-button">
                        <PiSignOutFill size={24}/>
                        <p className="text-name">Sign Out</p>
                    </button>
                </div>

            </div>

        </>
    );
}

export default DefaultSideBar;
