import './App.css'
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout.tsx";
import LoginPage from "./components/authentication/login/LoginPage.tsx";

import ProductCreatePage from "./components/products/create/ProductCreatePage.tsx";
import RegisterFirstPage from './components/authentication/register/RegisterFirstPage.tsx';
import RegisterSecondPage from './components/authentication/register/RegisterSecondPage.tsx';
import MainClothes from "./page/MainClothes.tsx";
import EditDetails from "./components/UserProfile/EditDetails/EditDetails.tsx";
import FaceBody from "./page/FaceBody.tsx";
import AddressPage from "./components/UserProfile/addressPage/AddressPage.tsx";
import Orders from "./components/UserProfile/userOrders/Orders.tsx";
import AddProduct from "./components/adminPanel/product/AddProduct.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<MainClothes/>}/>
                    <Route path="face&body" element={<FaceBody/>}/>
                    <Route path="admin" element={<AllUsers/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterFirstPage/>}/>
                    <Route path="register-second-page" element={<RegisterSecondPage/>}/>


                    <Route path="user-info">
                        <Route index element={<EditDetails/>}/>
                        <Route path="address" element={<AddressPage/>}/>
                        <Route path="orders" element={<Orders/>}/>
                    </Route>

                    <Route path="dashboard">
                       {/* <Route path="product/create" element={<ProductCreatePage/>}/>*/}
                        <Route path="product/create" element={<AddProduct/>}/>

                    </Route>

                </Route>

            </Routes>
        </>
    )
}

export default App
