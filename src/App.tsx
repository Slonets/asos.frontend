import './App.css'
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout.tsx";
import LoginPage from "./components/authentication/login/LoginPage.tsx";
import RegisterFirstPage from './components/authentication/register/RegisterFirstPage.tsx';
import RegisterSecondPage from './components/authentication/register/RegisterSecondPage.tsx';
import MainClothes from "./page/MainClothes.tsx";
import EditDetails from "./components/UserProfile/EditDetails/EditDetails.tsx";
import FaceBody from "./page/FaceBody.tsx";
import AddressPage from "./components/UserProfile/addressPage/AddressPage.tsx";
import AddProduct from "./components/adminPanel/product/AddProduct.tsx";
import DefaultAdminSideBar from "./components/adminPanel/default/DefaultAdminSideBar.tsx";
import AdminLayout from "./components/adminPanel/AdminLayout.tsx";
import UserLayout from "./components/UserProfile/UserLayout.tsx";
import Orders from "./components/UserProfile/userOrders/Orders.tsx";
import ForbiddenPage from "./page/Eror-403/ForbiddenPage.tsx";
import NotFound from "./page/NotFound.tsx";
import Users from './components/adminPanel/block-users/Users.tsx';
import AllProducts from "./components/adminPanel/product/AllProducts.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<MainClothes/>}/>
                    <Route path="face&body" element={<FaceBody/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterFirstPage/>}/>
                    <Route path="register-second-page" element={<RegisterSecondPage/>}/>
                </Route>

                <Route path={"/pages"}>
                    <Route path={"403"} element={<ForbiddenPage/>} />
                </Route>

                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index element={<DefaultAdminSideBar/>}/>
                    <Route path="create" element={<AddProduct/>}/>
                    <Route path="users" element={<Users/>}/>
                    <Route path="allproducts" element={<AllProducts/>}/>
                </Route>


                <Route path="/user-info" element={<UserLayout/>}>
                    <Route index element={<EditDetails/>}/>
                    <Route path="address" element={<AddressPage/>}/>
                    <Route path="orders" element={<Orders/>}/>
                </Route>

                <Route path="*" element={<NotFound />} />

            </Routes>
        </>
    )
}

export default App;