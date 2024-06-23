import {useState} from "react";
import UserProfile from "./UserProfile.tsx";
import  "./style/user_profile_style.css";
import ChangeUserProfile from "./ChangeUserProfile.tsx";


const ProfileForm = () => <div><UserProfile/></div>;
const DashboardForm = () => <div>Dashboard Form</div>;
const SettingsForm = () => <div><ChangeUserProfile/></div>;
const InvoiceForm = () => <div>Invoice Form</div>;

const InfoUserLayout=()=>
{
    const [activeTab, setActiveTab] = useState('Profile');

    const renderForm = () => {
        switch (activeTab)
        {
            case 'Profile':
                return <ProfileForm />;
            case 'Dashboard':
                return <DashboardForm />;
            case 'Settings':
                return <SettingsForm />;
            case 'Invoice':
                return <InvoiceForm />;
            default:
                return null;
        }
    };

    return(
        <>
            <div className="container mx-auto px-4 mt-20p w-80p">
        <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">Select your country</label>
            <select
                id="tabs"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setActiveTab(e.target.value)}
                value={activeTab}
            >
                <option value="Profile">Profile</option>
                <option value="Dashboard">Dashboard</option>
                <option value="Settings">Settings</option>
                <option value="Invoice">Invoice</option>
            </select>
        </div>
        <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
            <li className="w-full focus-within:z-10">
                <button
                    onClick={() => setActiveTab('Profile')}
                    className={`inline-block w-full p-4 ${activeTab === 'Profile' ? 'text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white' : 'bg-white hover:text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400'}`}
                >
                    Profile
                </button>
            </li>
            <li className="w-full focus-within:z-10">
                <button
                    onClick={() => setActiveTab('Dashboard')}
                    className={`inline-block w-full p-4 ${activeTab === 'Dashboard' ? 'text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white' : 'bg-white hover:text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400'}`}
                >
                    Dashboard
                </button>
            </li>
            <li className="w-full focus-within:z-10">
                <button
                    onClick={() => setActiveTab('Settings')}
                    className={`inline-block w-full p-4 ${activeTab === 'Settings' ? 'text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white' : 'bg-white hover:text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400'}`}
                >
                    Settings
                </button>
            </li>
            <li className="w-full focus-within:z-10">
                <button
                    onClick={() => setActiveTab('Invoice')}
                    className={`inline-block w-full p-4 ${activeTab === 'Invoice' ? 'text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white' : 'bg-white hover:text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400'}`}
                >
                    Invoice
                </button>
            </li>
        </ul>

        <div className="castum">
            {renderForm()}
        </div>
            </div>
        </>
    )
}

export default InfoUserLayout;