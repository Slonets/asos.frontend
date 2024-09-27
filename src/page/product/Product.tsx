import "./style.css";
import { Select, Typography } from "antd";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoReturnDownBack } from "react-icons/io5";

import { Form, Collapse } from 'antd';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IBrandName, ICategoryName, IGenderName, IProductCreate, ISizeName } from "../../components/types.ts";
import http_common from "../../http_common.ts";
import Carousel from 'react-bootstrap/Carousel';


const Product = () => {
    const { id } = useParams(); // Get the product ID from the route parameters

    const [product, setProduct] = useState<IProductCreate | null>(null);
    const [categories, setCategories] = useState<ICategoryName[]>([]);
    const [brands, setBrands] = useState<IBrandName[]>([]);
    const [sizes, setSizes] = useState<ISizeName[]>([]);
    const [genders, setGenders] = useState<IGenderName[]>([]);

    useEffect(() => {
        fetchProduct();
        fetchCategories();
        fetchBrands();
        fetchSizes();
        fetchGenders();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await http_common.get<IProductCreate>(`/api/Dashboard/GetProductById/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await http_common.get<ICategoryName[]>("/api/Dashboard/GetAllCategory");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await http_common.get<IBrandName[]>("/api/Dashboard/GetAllBrand");
            setBrands(response.data);
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };

    const fetchSizes = async () => {
        try {
            const response = await http_common.get<ISizeName[]>("/api/Dashboard/GetAllSizes");
            setSizes(response.data);
        } catch (error) {
            console.error("Error fetching sizes:", error);
        }
    };

    const fetchGenders = async () => {
        try {
            const response = await http_common.get<IGenderName[]>("/api/Dashboard/GetAllGenders");
            setGenders(response.data);
        } catch (error) {
            console.error("Error fetching genders:", error);
        }
    };


    const sizesOptions = sizes.map(item => ({ label: item.label, value: item.value }));

    return (
        <>
            {product && (
                <Form initialValues={product} layout="vertical">
                    <section className="section">
                        <Form.Item>
                            <div>
                                <div className="main-div-with-photo">
                                <div className="div-with-img">
                                    {/* Відображення зображень у Carousel */}
                                    <Carousel>
                                        {product.imageUrls.map((imgPath, index) => (
                                            <Carousel.Item key={index}>
                                                <img
                                                    src={`${import.meta.env.VITE_API_URL}product/${imgPath}`}
                                                    alt={`Product ${index}`}
                                                    style={{ width: '100%', height: 'auto' }} // Стилі для зображення
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </div>
                                </div>
                            </div>
                        </Form.Item>

                        <div>
                            <div className="div-with-info">
                                <Form.Item name="name">
                                    <Typography.Text className="h1-text">
                                        {product.name}
                                    </Typography.Text>
                                </Form.Item>
                                <Form.Item name="price">
                                    <Typography.Text className="text-price">
                                        ${product.price}
                                    </Typography.Text>
                                </Form.Item>

                                <div className="div-with-dropbutton  ">
                                    <div>
                                    <Form.Item name="colour">
                                        <Typography.Text className="text-info-about-prod">
                                            <div className="box-2">
                                                <p className="">Color</p>
                                                {product.color}
                                            </div>
                                        </Typography.Text>
                                    </Form.Item>
                                    </div>
                                    <div className="box-with-sizes">
                                        <p className="box-1-p-last">Size</p>
                                        <Form.Item name="size">
                                            <Select options={sizesOptions} />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="form-row button-container">
                                    <button type="submit" className="button save-button">Add to Cart</button>
                                </div>
                                <div className="main-div-delivery">
                                    <div className="div-delivery">
                                        <CiDeliveryTruck size={18} />
                                        <p className="text-delivery">Free delivery on qualifying orders</p>
                                    </div>

                                    <div className="div-delivery">
                                        <IoReturnDownBack size={18} />
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
                                        items={[{ key: '1', label: 'Product Description', children: <p>{product.description}</p> }]}
                                    />
                                </div>
                                <div className="div-accord">
                                    <Collapse
                                        items={[{ key: '1', label: 'About', children: <p>{product.aboutMe}</p> }]}
                                    />
                                </div>
                                <div className="div-accord">
                                    <Collapse
                                        items={[{ key: '1', label: 'Size & Fit', children: <p>{product.sizeAndFit}</p> }]}
                                    />
                                </div>
                                <div className="div-accord">
                                    <Collapse
                                        items={[{ key: '1', label: 'Look after me', children: <p>{product.lookAfterMe}</p> }]}
                                    />
                                </div>

                            </div>
                        </div>
                    </section>
                </Form>
            )}
        </>
    );
};

export default Product;
