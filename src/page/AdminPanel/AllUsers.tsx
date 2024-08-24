// import {useEffect, useState} from "react";
// import {IUser} from "../../components/authentication/login/type.ts";
// import http from "../../http_common.ts";
// import {APP_ENV} from "../../env";
// import "./style.css";
//
// const AllUsers = () => {
//     const baseUrl = APP_ENV.BASE_URL;
//
//     const [users, setUsers] = useState<IUser[]>([]);
//
//     useEffect(() => {
//         http.get("api/Account/GetAllUsers").then(resp => {
//             setUsers(resp.data);
//             console.log("Прийшли юзери", resp.data);
//         });
//     }, []);
//
//     const handleBlockUserClick = async (userId:number) => {
//         try {
//             const response = await http.post("api/Account/BlockUser", {userId});
//             // Обробка відповіді, якщо необхідно
//             console.log("User заблокований", response.data);
//
//         } catch (error)
//         {
//             console.error("Error blocking user", error);
//         }
//     };
//
//     return (
//         <>
//             {/*component */}
//             <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
//                 <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
//                     <thead className="bg-gray-50">
//                     <tr>
//                         <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
//                         <th scope="col" className="px-6 py-4 font-medium text-gray-900">State</th>
//                         <th scope="col" className="px-6 py-4 font-medium text-gray-900">Role</th>
//                         <th scope="col" className="px-6 py-4 font-medium text-gray-900">phoneNumber</th>
//                         <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
//                     </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100 border-t border-gray-100">
//                     {users.map(user => (
//                         <tr className="hover:bg-gray-50" key={user.id}>
//                             <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
//                                 <div className="relative h-10 w-10">
//                                     <img
//                                         className="h-full w-full rounded-full object-center"
//                                         src={
//                                             user.image
//                                                 ? `${baseUrl}avatars/${user.image}`
//                                                 : `${baseUrl}avatars/user404.png`
//                                         }
//                                         alt=""
//                                     />
//                                 </div>
//                                 <div className="text-sm">
//                                     <div className="font-medium text-gray-700">{user.firstName} {user.lastName}</div>
//                                     <div className="text-gray-400">{user.email}</div>
//                                 </div>
//                             </th>
//                             <td className="px-6 py-4">
//                                 {user.IsLockedOut ? (
//                                     <span
//                                         className="inline-flex items-center gap-1 rounded-full bg-red-400 px-2 py-1 text-xs font-semibold text-black"
//                                     >
//                                             <span className="h-1.5 w-1.5 rounded-full bg-red-950"></span>
//                                             Block
//                                         </span>
//                                 ) : (
//                                     <span
//                                         className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
//                                     >
//                                             <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
//                                             Active
//                                         </span>
//                                 )}
//                             </td>
//                             <td className="px-6 py-4">{user.roles}</td>
//                             <td className="px-6 py-4">
//                                 <div className="flex gap-2">
//                                         <span
//                                             className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
//                                         >
//                                             {user.phoneNumber}
//                                         </span>
//                                 </div>
//                             </td>
//                             <td className="px-6 py-4">
//                                 <div className="flex justify-end gap-4">
//                                     <a x-data="{ tooltip: 'UnBlock' }" href="#">
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke-width="1.5"
//                                             stroke="currentColor"
//                                             className="h-6 w-6"
//                                             x-tooltip="tooltip"
//                                         >
//                                             <path stroke-linecap="round" strokeLinecap="round" d="M4.5 12.75L10.5 18.75L19.5 5.25" />
//                                         </svg>
//                                     </a>
//                                     <a onClick={() => handleBlockUserClick(user.id)} x-data="{ tooltip: 'Block' }" href="#">
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke-width="1.5"
//                                             stroke="currentColor"
//                                             className="h-6 w-6"
//                                             x-tooltip="tooltip"
//                                         >
//                                             <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
//                                         </svg>
//                                     </a>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// };
//
// export default AllUsers;