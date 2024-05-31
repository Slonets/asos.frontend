import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import setAuthToken from "./helpers/setAuthToken.ts";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./utils/getEnvData.ts";
import {Provider} from "react-redux";
import {store} from "./store";


//Якщо сторінка перезавантажується на F5, то токен знову перезаписується
if(localStorage.token)
{
    setAuthToken(localStorage.token);
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
