import './App.css'
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout.tsx";
import LoginPage from "./components/authentication/login/LoginPage.tsx";
import UserProfile from "./page/UserService/UserProfile.tsx";
import InfoUserLayout from "./page/UserService/InfoUserLayout.tsx"
import ProductCreatePage from "./components/products/create/ProductCreatePage.tsx";
import AllUsers from "./page/AdminPanel/AllUsers.tsx";
import RegisterFirstPage from './components/authentication/register/RegisterFirstPage.tsx';
import RegisterSecondPage from './components/authentication/register/RegisterSecondPage.tsx';
import MainClothes from "./page/MainClothes.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<MainClothes/>}/>
                    <Route path="admin" element={<AllUsers/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterFirstPage/>}/>
                    <Route path="register-second-page" element={<RegisterSecondPage/>}/>


                    <Route path="user-info" element={<InfoUserLayout/>}>
                        <Route path="profile" element={<UserProfile/>}/>
                    </Route>

                    <Route path="dashboard">
                        <Route path="product/create" element={<ProductCreatePage/>}/>
                    </Route>

                </Route>

            </Routes>
        </>
    )
}

export default App
