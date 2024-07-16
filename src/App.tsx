import './App.css'
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout.tsx";
import LoginPage from "./components/authentication/login/LoginPage.tsx";
import UserProfile from "./page/UserService/UserProfile.tsx";
import InfoUserLayout from "./page/UserService/InfoUserLayout.tsx"
import ProductCreatePage from "./components/products/create/ProductCreatePage.tsx";
import HomePage from "./components/home/HomePage.tsx";
import AllUsers from "./page/AdminPanel/AllUsers.tsx";
import RegisterFirstPage from './components/authentication/register/RegisterFirstPage.tsx';
import RegisterSecondPage from './components/authentication/register/RegisterSecondPage.tsx';
import ThirdPage from "./components/authentication/register/ThirdPage.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<HomePage/>}/>
                    <Route path="admin" element={<AllUsers/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterFirstPage/>}/>
                    <Route path="register-second-page" element={<RegisterSecondPage/>}/>
                    <Route path="register-third-page" element={<ThirdPage/>}/>

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
