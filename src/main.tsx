import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import setAuthToken from "./helpers/setAuthToken.ts";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./utils/getEnvData.ts";
import {Provider} from "react-redux";
import {store} from "./store";
import {IUser} from "./components/authentication/login/type.ts";
import {jwtDecode} from "jwt-decode";
import {AuthUserActionType} from "./components/authentication/type.ts";
import {BasketActionType} from "./store/slice/basketSlise.ts";

// Якщо сторінка перезавантажується на F5, то токен знову перезаписується
if(localStorage.token)
{
    setAuthToken(localStorage.token);
    const user = jwtDecode<IUser>(localStorage.token);
    store.dispatch({type: AuthUserActionType.LOGIN_USER, payload: user});
}

if(localStorage.cart)
{
    const cart: { productId: number, count: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');
    store.dispatch({
        type:BasketActionType.ADD_BASKET,
        payload:cart
    });
}


ReactDOM.createRoot(document.getElementById('root')!).render(
   <>
       <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
       <Provider store={store}>
           <BrowserRouter>
               <App />
           </BrowserRouter>
       </Provider>
   </GoogleOAuthProvider>
   </>
)
