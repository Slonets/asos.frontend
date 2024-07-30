import "../Style-UserProfile.scss";
import Logo from '../../../../src/assets/logo.png';
import {GoArrowLeft} from "react-icons/go";

const ProfileDefaultHeader = () => {
    return (
        <>
            <div className="header">
                <button>
                    <GoArrowLeft size={56}/>
                </button>
                <img className="logo-img" src={Logo} alt={"Logo"}/>
                <button>Account</button>
            </div>


        </>
    )
}

export default ProfileDefaultHeader;