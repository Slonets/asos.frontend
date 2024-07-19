import "../Style-UserProfile.css";
import Logo from '../../../../src/assets/logo.png';
import { GoArrowLeft } from "react-icons/go";

const DefaultHeader = () =>{
    return(
        <>
        <div className="header">
            <GoArrowLeft size={56}  />
            <img className="logo-img" src={Logo} alt={"Logo"}/>
            <h2>Account</h2>
        </div>


            </>
    )
}

export default  DefaultHeader;