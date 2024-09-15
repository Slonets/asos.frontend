import "./style.css";
import {Link} from "react-router-dom";
import {useState} from "react";
const Basket=()=>{

    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        if (quantity > 1)
        {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrement = () => {
        if (quantity < 50)
        {
            setQuantity(quantity + 1);
        }
    };

    return(
        <>
           <div className="Cart-Text">
               <span>cart</span>
           </div>

            <section className="Basick-section">

                <div className="Cart-Basket">

                    {/*ЦЕ КАРТОЧКА*/}
                    <div className="CartBasketItem">

                        <div className="Frame92">

                            <div className="FrameImage">

                                <img alt="" src=""/>

                            </div>

                            <div className="Frame91-3">

                                <span className="Name-Item">Тут буде імя</span>
                                <span className="Brand-Item">Brand: <span>Підкреслене</span></span>
                                <span className="Brand-Item">Size: <span>Підкреслене</span></span>
                                <span className="Brand-Item">Color: <span>Підкреслене</span></span>
                                <span className="Price-Item">£</span>

                            </div>

                        </div>

                        <div className="Frame575">

                            <button className="hover-red">

                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 32 32" fill="none">
                                    <path d="M24 8L8 24" stroke="#0D0D0D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 8L24 24" stroke="#0D0D0D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                            </button>


                            <form className="max-w-xs mx-auto castom">
                                <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Choose quantity:
                                </label>
                                <div className="relative flex items-center max-w-[8rem]">
                                    <button
                                        type="button"
                                        onClick={handleDecrement}
                                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                    >
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                        </svg>
                                    </button>
                                    <input
                                        type="text"
                                        id="quantity-input"
                                        value={quantity}
                                        readOnly
                                        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleIncrement}
                                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                    >
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>

                </div>

                <div className="Frame446">

                    <div className="Frame445">

                        <div className="Cart-Total">

                            <div className="Frame444">

                                <div className="Frame443">

                                    <div className="Frame435">

                                        <span>Total:</span>
                                        <span>£</span>

                                    </div>

                                    <div className="Frame442">

                                        <div className="Frame437">

                                            <div className="Frame436">

                                                <span>delivery</span>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                    <path d="M12.5 22.5C18.0228 22.5 22.5 18.0228 22.5 12.5C22.5 6.97715 18.0228 2.5 12.5 2.5C6.97715 2.5 2.5 6.97715 2.5 12.5C2.5 18.0228 6.97715 22.5 12.5 22.5Z" stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M12.5 16.5V12.5" stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M12.5 8.5H12.51" stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>

                                            </div>

                                            <div className="Frame365">
                                                 <p>Standart Delivery (Free)</p>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                                                    <path d="M1.5 1L7 7L12.5 1" stroke="#707070" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>

                                            </div>
                                        </div>

                                        <div className="Frame441">

                                             <span>we accept</span>

                                            <div className="Frame440">

                                                <div className="Frame438">

                                                    <button className="CreditCart1"></button>

                                                    <button className="CreditCart2"></button>

                                                    <button className="CreditCart3"></button>

                                                    <button className="CreditCart4"></button>

                                                </div>

                                                <div className="Frame438-2">

                                                    <button className="CreditCart5"></button>

                                                    <button className="CreditCart6"></button>

                                                    <button className="CreditCart7"></button>

                                                    <button className="CreditCart8"></button>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <Link to="" className="Got-Text">Got a discount code? Click here to add.</Link>

                                </div>

                            </div>

                        </div>

                    </div>

                    <button className="Checkout">checkout</button>

                </div>

            </section>
        </>
    )
}

export default Basket;