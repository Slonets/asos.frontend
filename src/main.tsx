import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import setAuthToken from "./helpers/setAuthToken.ts";


//Якщо сторінка перезавантажується на F5, то токен знову перезаписується
if(localStorage.token)
{
    setAuthToken(localStorage.token);
}


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
)
