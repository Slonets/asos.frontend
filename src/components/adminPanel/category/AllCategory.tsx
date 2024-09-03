
import ProfileDefaultHeader from "../../UserProfile/default/ProfileDefaultHeader.tsx";
import DefaultAdminSideBar from "../default/DefaultAdminSideBar.tsx";
import {useEffect, useState} from "react";
import http from "../../../http_common.ts";
import {IGetAllCategory} from "../../types.ts";


const AllCategory=()=>{
    const [category, setCategory] = useState<IGetAllCategory[]>([]);
    const [response] = useState<string>("");
    useEffect(() => {

        http.get("api/Dashboard/GetAllCategory").then(resp => {
            setCategory(resp.data);
            console.log("Прийшли категорії", resp.data);
        });
    }, [response]);


    const handleDelete = async (id: number) => {
        try {
            await http.delete(`api/Dashboard/DeleteCategory/${id}`);

            setCategory(category.filter(category => category.id !== id));
        } catch (error) {
            console.error("Error deleting category", error);
        }
    };



    return(
        <>

            <div className="centered-div">
                <ProfileDefaultHeader/>
            </div>

            <div className="main-container">

                <DefaultAdminSideBar/>

                <div className="Frame185">

                    <div className="UsersDiv">
                        <p>Category</p>
                    </div>

                    {category.map(category => (

                        <div className="ProductsDiv" key={category.id}>

                            <div className="">
                                <p>{category.id}</p>
                            </div>
                            <div className="Name-SecondName">
                                <p>{category.name}</p>
                            </div>


                            <button type="button"
                                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    onClick={() => handleDelete(category.id)}>
                                Delete

                            </button>

                        </div>
                    ))}


                </div>

            </div>
        </>
    )
}

export default AllCategory;