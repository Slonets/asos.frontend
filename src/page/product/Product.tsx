import "./style.css";
import {InputNumber, Select} from "antd";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoReturnDownBack } from "react-icons/io5";

import { Collapse } from 'antd';
const Product=()=> {






    return (
        <>
            <section className="section">
                <div>
                    <div className="div-with-img">
                        <img src="../../../public/Clothes/Foto2.png"/>
                        <img src="../../../public/Clothes/Foto2.png"/>
                        <img src="../../../public/Clothes/Foto2.png"/>
                        <img src="../../../public/Clothes/Foto2.png"/>
                    </div>
                </div>
                <div>
                    <div className="div-with-info">
                        <h1>Name of product</h1>
                        <p className="text-price">$80.00</p>


                        <div className="div-with-dropbutton">
                            <div className="box-1">
                                <p className="box-1-p">Colour</p>
                                <Select className="dropdown-button" placeholder="Select the Colour: "/>
                            </div>
                            <div className="box-1">
                                <p className="box-1-p">Size</p>
                                <Select className="dropdown-button" placeholder="Select the Size: "/>
                            </div>
                            <div className="box-1">
                                <p className="box-1-p-last">Amount</p>
                                <InputNumber className="amount-button" min={0} autoComplete="off"/>
                            </div>
                        </div>
                        <div className="form-row button-container">
                            <button type="submit" className="button save-button">Add to Cart</button>
                        </div>
                        <div className="main-div-delivery">
                            <div className="div-delivery">
                                <CiDeliveryTruck size={18}/>
                                <p className="text-delivery">Free delivery on qualifying orders</p>
                            </div>

                            <div className="div-delivery">
                                <IoReturnDownBack size={18}/>
                                <p className="text-delivery">Free returns</p>
                            </div>
                        </div>
                        <div className="last-text-delivery">
                            <p className="text-delivery">This product has shipping restrictions</p>
                        </div>
                    </div>
                    <div className="div-accord-margin">
                    <div className="div-accord">
                        <Collapse
                            items={[{key: '1', label: 'Product Description', children: <p>hello</p>}]}
                        />
                    </div>
                    <div className="div-accord">
                        <Collapse
                            items={[{key: '1', label: 'About Brand', children: <p>hello</p>}]}
                        />
                    </div>
                    <div className="div-accord">
                        <Collapse
                            items={[{key: '1', label: 'Size & Fit', children: <p>hello</p>}]}
                        />
                    </div>
                    <div className="div-accord">
                        <Collapse
                            items={[{key: '1', label: 'Product Care', children: <p>hello</p>}]}
                        />
                    </div>
                    <div className="div-accord">
                        <Collapse
                            items={[{key: '1', label: 'Product Material', children: <p>hello</p>}]}
                        />
                    </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Product;