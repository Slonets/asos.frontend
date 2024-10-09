import "../product/AllProductsSiteStyle.css"
import {useEffect, useState} from "react";
import {IGetAllProducts} from "../../components/types.ts";
//import {useNavigate} from "react-router-dom";
import http from "../../http_common.ts";

const AllProductSite = () => {

    const [products, setProducts] = useState<IGetAllProducts[]>([]);
    // @ts-ignore
    const [totalProducts, setTotalProducts] = useState<number>(0); // Загальна кількість продуктів
    // @ts-ignore
    const [currentPage, setCurrentPage] = useState<number>(1); // Номер поточної сторінки
    const productsPerPage = 12; // Кількість продуктів на сторінку

    //const navigate = useNavigate();

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = (page: number) => {
        http.get(`api/Dashboard/GetAllProducts?pageNumber=${page}&pageSize=${productsPerPage}`)
            .then(resp => {
                setProducts(resp.data.items); // Продукти для поточної сторінки
                setTotalProducts(resp.data.totalCount); // Загальна кількість продуктів
                console.log(resp.data.items);
            })
            .catch(error => {
                console.error("Error fetching products", error);
            });
    };

    //const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="mainbox">
                {products.map((product, index) => (
                    <div className="boxelement" key={index}>
                        <div className="boxwithimg">
                            <img
                                src={`${import.meta.env.VITE_API_URL}product/${product.imageUrls[0]}`}
                                alt={product.name}

                            />
                        </div>
                        <div className="boxwithinfo">
                            <div>
                                <h1>{product.name}</h1>
                                <p>Colour: {product.color}</p>
                            </div>
                            <div className="boxwithprice">
                                <h2>${product.price}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AllProductSite;
