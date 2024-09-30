import {useEffect, useState} from "react";
import "./style.css";
import ProfileDefaultHeader from "../default/ProfileDefaultHeader";
import DefaultSideBar from "../default/DefaultSideBar";
import 'react-datepicker/dist/react-datepicker.css';
// import { FiPackage } from "react-icons/fi";

import {Link} from "react-router-dom";
import http from "../../../http_common.ts";
import {IOrderInformation} from "../../types.ts";
import {APP_ENV} from "../../../env";

const Orders = () => {

    const baseUrl = APP_ENV.BASE_URL;

    const [getOrder, setOrder] = useState<IOrderInformation[]>([]);

    useEffect(() => {

        http.get("api/Order/OrderInfo").then(resp => {
            setOrder(resp.data);
            console.log("Прийшли замовлення", resp.data);
        });

    }, []);


    return (
        <>
            <div className="centered-div">
                <ProfileDefaultHeader/>
            </div>

            <div className="new-container">
                <DefaultSideBar/>

                {getOrder.length>0 ?(
                    <div className="content-container">

                        <div className="div-with-text">
                            <h2>My Orders</h2>
                        </div>

                        {getOrder.map((order)=>(


                        <div className="Frame161" key={order.id}>

                            <span className="Order-number">Order pack #{order.id}</span>

                            <div className="Special-Wrapper">

                                {/*Сходи з фотографій*/}

                                {order.imagePaths.length > 5 ? (

                                    <div className="Order-Img">
                                        <div className="Frame108-3">
                                            <img src={`${baseUrl}product/${order.imagePaths[0]}`} alt=""/>
                                        </div>
                                        <div className="Frame109-3">
                                            <img src={`${baseUrl}product/${order.imagePaths[3]}`} alt=""/>
                                        </div>
                                        <div className="Frame110-3">
                                            <img src={`${baseUrl}product/${order.imagePaths[5]}`} alt=""/>
                                        </div>
                                    </div>

                                ) : order.imagePaths.length < 5 ? (

                                    <div className="Order-Img">
                                        <div className="Frame108-2">
                                            <img src={`${baseUrl}product/${order.imagePaths[1]}`} alt=""/>
                                        </div>
                                        <div className="Frame109-2">
                                            <img src={`${baseUrl}product/${order.imagePaths[3]}`} alt=""/>
                                        </div>
                                    </div>

                                ) : order.imagePaths.length >1 && order.imagePaths.length >=3 ? (

                                    <div className="Order-Img">
                                        <div className="Frame108-1">
                                            <img src={`${baseUrl}product/${order.imagePaths[3]}`} alt=""/>
                                        </div>
                                    </div>

                                ) : (
                                    <p>No images available</p>
                                )}


                                <div className="Frame160">

                                    <div className="Frame159">

                                        <div className="Frame158">

                                            {order.names.map((name, index) => (

                                                <p key={index}>{name}</p>
                                            ))}

                                        </div>

                                        <Link to={`/user-info/orders/${order.id}`} className="Link-Order-Datails">Show in details  </Link>

                                        <span className="Total-PriceOrder">Total: £{order.totalPrice}</span>

                                    </div>

                                    <div className="Frame157">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <path d="M21.332 4H1.33203V21.3333H21.332V4Z" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M21.332 10.6667H26.6654L30.6654 14.6667V21.3334H21.332V10.6667Z" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M7.33333 28C9.17428 28 10.6667 26.5076 10.6667 24.6666C10.6667 22.8257 9.17428 21.3333 7.33333 21.3333C5.49238 21.3333 4 22.8257 4 24.6666C4 26.5076 5.49238 28 7.33333 28Z" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M24.6654 28C26.5063 28 27.9987 26.5076 27.9987 24.6666C27.9987 22.8257 26.5063 21.3333 24.6654 21.3333C22.8244 21.3333 21.332 22.8257 21.332 24.6666C21.332 26.5076 22.8244 28 24.6654 28Z" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>

                                        <p>On your way! Will be delivered in 2 days</p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        ))}

                        {/*<div className="orderBox">*/}
                        {/*    <img src="/Clothes/Ragtangel209.png" alt="img" className="Rectangle1"/>*/}
                        {/*    <div className="orderDetails">*/}
                        {/*        <h3>Mixed texture Bow Front Mini Dress</h3>*/}
                        {/*        <p>Brand: Miss Selfridge</p>*/}
                        {/*        <p>Size: UK 12/M</p>*/}
                        {/*        <p>Colour: Blue</p>*/}

                        {/*        <div className="priceAndIcon">*/}
                        {/*            <p className="pricetext">$27.99</p>*/}
                        {/*            <div className="iconWrapper">*/}
                        {/*                <FiPackage size={32}/>*/}
                        {/*                <p className="texticon">packed</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                    </div>

                ):(
                        <div className="div-with-empty">
                            <h2>Orders is clear</h2>
                        </div>
                )};
            </div>
        </>
    )

};

export default Orders;