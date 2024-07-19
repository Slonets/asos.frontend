import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { APP_ENV } from "../../../env";
import http from "../../../http_common";
import { AuthUserActionType } from "../../authentication/type";
import { IUser } from "../../authentication/login/type";
import "../Style-UserProfile.css";
import { MdOutlinePhotoCamera } from "react-icons/md";
const DefaultSideBar = () => {
    const baseUrl = APP_ENV.BASE_URL;
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.user);

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


            <div className="img-div">
                <div className="image-container">
                    <label htmlFor="pickFoto" className="image-label">
                        <div className="placeholder">
                            <MdOutlinePhotoCamera size={32} />
                        </div>
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
                <p>Hi there,</p>
            </div>

        </>
    );
}

export default DefaultSideBar;
