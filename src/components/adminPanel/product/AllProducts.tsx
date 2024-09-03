
import ProfileDefaultHeader from "../../UserProfile/default/ProfileDefaultHeader.tsx";
import DefaultAdminSideBar from "../default/DefaultAdminSideBar.tsx";
import {useEffect, useState} from "react";
import http from "../../../http_common.ts";
import {IGetAllProducts} from "../../types.ts";


const AllProducts=()=>{
    const [products, setProducts] = useState<IGetAllProducts[]>([]);
    const [response] = useState<string>("");
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
    const [brands, setBrands] = useState<{ id: string, name: string }[]>([]);
    useEffect(() => {

        http.get("api/Dashboard/GetAllProducts").then(resp => {
            setProducts(resp.data);
            console.log("Прийшли продукти", resp.data);
        });
    }, [response]);

    useEffect(() => {
        http.get("api/Dashboard/GetAllCategory").then(resp => {
            setCategories(resp.data);
        });
    }, []);
    useEffect(() => {
        http.get("api/Dashboard/GetAllBrand").then(resp => {
            setBrands(resp.data);
        });
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await http.delete(`api/Dashboard/DeleteProduct/${id}`);
            // Оновлюємо список товарів після видалення
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };


    const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));
    const brandMap = new Map(brands.map(cat => [cat.id, cat.name]));
    return(
        <>

            <div className="centered-div">
                <ProfileDefaultHeader/>
            </div>

            <div className="main-container">

                <DefaultAdminSideBar/>

                <div className="Frame185">

                    <div className="UsersDiv">
                        <p>Products</p>
                    </div>

                    {products.map(product => (

                        <div className="ProductsDiv" key={product.id}>

                            <div className="">
                                <p>{product.id}</p>
                            </div>
                            <div className="Name-SecondName">
                                <p>{product.name}</p>
                            </div>

                            <div className="Role-Div">
                                <p>{categoryMap.get(product.categoryId) || 'Unknown Category'}</p>
                            </div>
                            <div className="Role-Div">
                                <p>{brandMap.get(product.brandId) || 'Unknown Category'}</p>
                            </div>

                            <div className="Role-Div">
                                <p>{product.price}$</p>
                            </div>
                            <button type="button"
                                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    onClick={() => handleDelete(product.id)}>
                                Delete

                            </button>

                        </div>
                    ))}


                </div>

            </div>
        </>
    )
}

export default AllProducts;