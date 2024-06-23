import './App.css'
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout.tsx";
// import HomePage from "./components/home/HomePage.tsx";
import IdentityDefault from "./components/containers/default/IdentityDefault.tsx";
import LoginPage from "./components/authentication/login/LoginPage.tsx";
import RegisterPage from "./components/authentication/register/RegisterPage.tsx";
import UserProfile from "./page/UserService/UserProfile.tsx";
import InfoUserLayout from "./page/UserService/InfoUserLayout.tsx"

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<RegisterPage/>}/>
                    <Route path="login" element={<LoginPage />} />


                    <Route path="identity" element={<IdentityDefault/>}>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="register" element={<RegisterPage/>}/>
                    </Route>

                    <Route path="user-info" element={<InfoUserLayout/>}>
                        <Route path="profile" element={<UserProfile/>}/>
                    </Route>

                </Route>

            </Routes>
        </>
    )
}

export default App
