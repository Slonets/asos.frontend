import ProfileDefaultHeader from "../../UserProfile/default/ProfileDefaultHeader.tsx";
import DefaultAdminSideBar from "../default/DefaultAdminSideBar.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import http from "../../../http_common.ts";
import {ChangeOrderStatus, OrderStatusEntity} from "./type.ts";

const ChangeStatus=()=>{

    const { id } = useParams(); // Отримуємо ID продукту з параметрів маршруту
    const navigate = useNavigate();
    const [order, setOrder] = useState<ChangeOrderStatus>();

    useEffect(() => {

        http.get(`api/Order/ResiveOrderById/${id}`)
            .then(resp => {
                setOrder(resp.data);
                console.log("Прийшло замовлення",resp.data as ChangeOrderStatus);

                statusSet(resp.data.status);

            })
            .catch(error => {
                console.error("Error fetching products", error);
            });

    }, [id]);

    const [statusGet, statusSet] = useState<number>();

    const [allStatusGet, allStatusSet] = useState<OrderStatusEntity[]>([]);

    useEffect(() => {

        http.get(`api/Order/GetAllStatus`)
            .then(resp => {

                allStatusSet(resp.data);
                console.log("Прийшли статуси",resp.data);

            })
            .catch(error => {
                console.error("Error fetching products", error);
            });

    }, []);



    const handleSubmit = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = String(e.target.value);
        console.log("Прийшло значення:", newStatus);
        statusSet(newStatus);
    };

    const ChangeSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Важливо не перезавантажувати сторінку
        const payload = {
            newStatus: statusGet,
            id: id
        };

        http.post(`api/Order/ChangeStatus`, payload)
            .then(() => {
                console.log("Статус змінено успішно");
                navigate("/admin/status");
            })
            .catch(error => {
                console.error("Помилка при зміні статусу", error);
            });
    };

    return(
        <>
            <div className="centered-div">
                <ProfileDefaultHeader backLink="/admin"/>
            </div>

            <div className="main-container">

                <DefaultAdminSideBar />

                <div className="containerChange">
                    <form onSubmit={ChangeSubmit} className="form">
                        <div className="my-status">

                            <h3>Сustomer: {order?.userName}</h3>

                            <label className="blue-text label margin10">Name Product:</label>
                            {order?.names.map((name, index) => (
                                <h4 key={index} className="Name-Orders">
                                    -{name};<br/>
                                </h4>
                            ))}


                            <div className="custum-select">


                            <label className="blue-text label margin10 ">Status:</label>

                            <select className="input border-gray-300 small"

                                    value={statusGet}

                                    onChange={(e) => handleSubmit(e)}

                            >
                                {allStatusGet.length > 0 ? (
                                    allStatusGet.map((status) => (
                                        <option key={status.id} value={status.id}>
                                            {status.name}
                                        </option>
                                    ))
                                ) : (
                                    <option>Loading...</option>
                                )}
                            </select>
                            </div>
                        </div>

                        <div className="form-row button-container">
                            <button type="submit" className="button save-button">Change Status</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangeStatus;