import {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import {RootState} from "../../../store";
import "../Style-UserProfile.scss";
import ProfileDefaultHeader from "../default/ProfileDefaultHeader";
import DefaultSideBar from "../default/DefaultSideBar";
import {IUser} from "../../authentication/login/type.ts";
import 'react-datepicker/dist/react-datepicker.css';
import { FiPackage } from "react-icons/fi";

const Orders = () => {



    const init: IUser = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        image: "",
        roles: "",
        IsLockedOut: false,
        birthday:null,
    };

    const currentUser = useSelector((state: RootState) => state.auth.user);

    const [user, setUser] = useState<IUser>(init);


    useEffect(() => {
        if (currentUser)
        {
            setUser(currentUser);
            console.log("Прийшов такий user", user);



        }
    }, [currentUser]);




    return (
        <>
            <div className="centered-div">
                <ProfileDefaultHeader/>
            </div>

            <div className="main-container">
                <DefaultSideBar/>
                <div className="content-container">
                    <div className="div-with-text">
                        <h2>My Orders</h2>
                    </div>

                    <div className="orderBox">
                        <img src="/Clothes/Ragtangel209.png" alt="img" className="Rectangle1"/>
                        <div className="orderDetails">
                            <h3>Mixed texture Bow Front Mini Dress</h3>
                            <p>Brand: Miss Selfridge</p>
                            <p>Size: UK 12/M</p>
                            <p>Colour: Blue</p>

                            <div className="priceAndIcon">
                                <p className="pricetext">$27.99</p>
                                <div className="iconWrapper">
                                    <FiPackage size={32}/>
                                    <p className="texticon">packed</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="orderBox">
                        <img src="/Clothes/Ragtangel208.png" alt="img" className="Rectangle1"/>
                        <div className="orderDetails">
                            <h3>Mixed texture Bow Front Mini Dress</h3>
                            <p>Brand: Miss Selfridge</p>
                            <p>Size: UK 12/M</p>
                            <p>Colour: Blue</p>

                            <div className="priceAndIcon">
                                <p className="pricetext">$27.99</p>
                                <div className="iconWrapper">
                                    <FiPackage size={32}/>
                                    <p className="texticon">packed</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="orderBox">
                        <img src="/Clothes/Rectangle16.png" alt="img" className="Rectangle1"/>
                        <div className="orderDetails">
                            <h3>Mixed texture Bow Front Mini Dress</h3>
                            <p>Brand: Miss Selfridge</p>
                            <p>Size: UK 12/M</p>
                            <p>Colour: Blue</p>

                            <div className="priceAndIcon">
                                <p className="pricetext">$27.99</p>
                                <div className="iconWrapper">
                                    <FiPackage size={32}/>
                                    <p className="texticon">packed</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
        ;
};

export default Orders;
