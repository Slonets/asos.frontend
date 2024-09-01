import "../../UserProfile/Style-UserProfile.scss";
import ProfileDefaultHeader from "../../UserProfile/default/ProfileDefaultHeader.tsx";
import 'react-datepicker/dist/react-datepicker.css';
import {useEffect, useState} from "react";
import {
    IBrandName,
    ICategoryName,
    IGenderName,
    IProductCreate,
    ISizeName,
    ISubCategoryName,
    IUploadedFile
} from "../../types.ts";
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, InputNumber, Row, Select, Upload} from "antd";
import http_common from "../../../http_common.ts";
import TextArea from "antd/es/input/TextArea";
import type {UploadChangeParam} from "antd/es/upload";
import {PlusOutlined} from "@ant-design/icons";
import DefaultAdminSideBar from "../default/DefaultAdminSideBar.tsx";
const AddProduct = () => {


        const [categories, setCategories] = useState<ICategoryName[]>([]);
        const [brands, setBrands] = useState<IBrandName[]>([]);
        const [sizes, setSizes] = useState<ISizeName[]>([]);
        const [genders, setGenders] = useState<IGenderName[]>([]);
        const [subcategories, setSubcategories] = useState<ISubCategoryName[]>([]);
        const [filteredSubcategories, setFilteredSubcategories] = useState<ISubCategoryName[]>([]);

        const navigate = useNavigate();
        const [form] = Form.useForm<IProductCreate>();

        useEffect(() => {
            fetchCategories();
            fetchBrands();
            fetchSizes();
            fetchGenders();
            fetchSubcategories(); // Додано виклик функції для завантаження підкатегорій
        }, []);

        const fetchCategories = async () => {
            try {
                const response = await http_common.get<ICategoryName[]>("/api/Dashboard/GetAllCategory");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchBrands = async () => {
            try {
                const response = await http_common.get<IBrandName[]>("/api/Dashboard/GetAllBrand");
                setBrands(response.data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        const fetchSizes = async () => {
            try {
                const response = await http_common.get<ISizeName[]>("/api/Dashboard/GetAllSizes");
                setSizes(response.data);
            } catch (error) {
                console.error("Error fetching sizes:", error);
            }
        };

        const fetchGenders = async () => {
            try {
                const response = await http_common.get<IGenderName[]>("/api/Dashboard/GetAllGenders");
                setGenders(response.data);
            } catch (error) {
                console.error("Error fetching genders:", error);
            }
        };

        const fetchSubcategories = async () => { // Додано функцію для завантаження підкатегорій
            try {
                const response = await http_common.get<ISubCategoryName[]>("/api/Dashboard/GetAllSubCategory");
                setSubcategories(response.data);
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };

        const handleCategoryChange = (value: number) => {
            const filtered = subcategories.filter(subcat => subcat.categoryId === value);
            setFilteredSubcategories(filtered);
        };

        const categoriesData = categories?.map(item => ({ label: item.name, value: item.id }));
        const brandsData = brands?.map(item => ({ label: item.name, value: item.id }));
        const subcategoriesData = filteredSubcategories?.map(item => ({ label: item.name, value: item.id }));

        const onSubmit = async (values: IProductCreate) => {
            try {
                await http_common.post("/api/Dashboard/CreateProduct", values, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },

                });
                navigate("/");
            } catch (ex) {
                console.log("error>",values)
                console.error("Exception creating product:", ex);
            }
        };


    return (
        <>
            <div className="centered-div">
                <ProfileDefaultHeader/>
            </div>

            <div className="main-container">
                <DefaultAdminSideBar/>
                <div className="content-container">
                    <div className="div-with-text">
                        <h2>Create Product</h2>
                    </div>
                    <div className="widthdiv">
                    <Row gutter={16}>
                        <Form
                            form={form}
                            onFinish={onSubmit}
                            layout={"vertical"}
                            style={{
                                minWidth: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                padding: 20,
                            }}
                        >
                            <div className="widthdiv">
                            <Form.Item
                                label="Name"
                                name="Name"
                                htmlFor="Name"
                                rules={[
                                    { required: true, message: 'It is a required field!' },
                                    { min: 3, message: 'Name must have at least 3 characters!' },
                                ]}
                            >
                                <Input autoComplete="name" />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="Description"
                                htmlFor="Description"
                                rules={[
                                    { required: true, message: 'It is a required field!' },
                                    { min: 10, message: 'Description must have at least 10 characters!' },
                                ]}
                            >
                                <TextArea />
                            </Form.Item>

                            <Form.Item
                                label="Category"
                                name="CategoryId"
                                htmlFor="CategoryId"
                                rules={[
                                    { required: true, message: 'It is a required field!' },
                                ]}
                            >
                                <Select
                                    placeholder="Select the category: "
                                    options={categoriesData}
                                    onChange={handleCategoryChange}
                                />
                            </Form.Item>

                            <Form.Item
                                label="SubCategory"
                                name="SubCategoryId"
                                htmlFor="SubCategoryId"
                                rules={[
                                    { required: false, message: 'It is a required field!' },
                                ]}
                            >
                                <Select
                                    placeholder="Select the SubCategory: "
                                    options={subcategoriesData}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="Price"
                                htmlFor="Price"
                                rules={[
                                    { required: true, message: 'It is a required field!' },
                                    { type: 'number' }
                                ]}
                            >
                                <InputNumber min={0} autoComplete="off" />
                            </Form.Item>

                            <Form.Item
                                label="Size"
                                name="Size"
                                htmlFor="Size"
                                rules={[
                                    { required: true, message: 'It is a required field!' },
                                ]}
                            >
                                <Select
                                    //mode="multiple"
                                    placeholder="Select the size: "
                                    options={sizes.map(item => ({ label: item.label, value: item.value }))}
                                />
                            </Form.Item>



                            <Form.Item
                                label="Color"
                                name="Color"
                                htmlFor="Color"
                                rules={[
                                    { required: true, message: 'It is a required field!' },
                                    { min: 3, message: 'Color must have at least 3 characters!' },
                                ]}
                            >
                                <Input autoComplete="off" />
                            </Form.Item>

                            <Form.Item
                                label="Brand"
                                name="BrandId"
                                htmlFor="BrandId"
                                rules={[
                                    { required: true, message: 'It is a required field!' },
                                ]}
                            >
                                <Select
                                    placeholder="Select the brand: "
                                    options={brandsData}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Gender"
                                name="Gender"
                                htmlFor="Gender"
                                rules={[
                                    { required: true, message: 'It is a required field!' },
                                ]}
                            >
                                <Select
                                    placeholder="Select the Gender: "
                                    options={genders.map(item => ({ label: item.label, value: item.value }))}
                                />
                            </Form.Item>

                            <Form.Item
                                label="SizeAndFit"
                                name="SizeAndFit"
                                htmlFor="SizeAndFit"
                                rules={[
                                    { required: true, message: 'It is a required field!' },
                                    { min: 10, message: 'SizeAndFit must have at least 10 characters!' },
                                ]}
                            >
                                <TextArea />
                            </Form.Item>

                            <Form.Item
                                label="LookAfterMe"
                                name="LookAfterMe"
                                htmlFor="LookAfterMe"
                                rules={[
                                    { required: true, message: 'It is a required field!' },
                                    { min: 10, message: 'LookAfterMe must have at least 10 characters!' },
                                ]}
                            >
                                <TextArea />
                            </Form.Item>

                            <Form.Item
                                label="AboutMe"
                                name="AboutMe"
                                htmlFor="AboutMe"
                                rules={[
                                    { required: true, message: 'It is a required field!' },
                                    { min: 10, message: 'AboutMe must have at least 10 characters!' },
                                ]}
                            >
                                <TextArea />
                            </Form.Item>

                            <Form.Item
                                label="Amount"
                                name="Amount"
                                htmlFor="Amount"
                                rules={[
                                    { required: true, message: 'It is a required field!' },
                                    { type: 'number' }
                                ]}
                            >
                                <InputNumber min={0} autoComplete="off" />
                            </Form.Item>

                            <Form.Item
                                name="ImageUrls"
                                label="Images"
                                valuePropName="ImageUrls"
                                getValueFromEvent={(e: UploadChangeParam) => {
                                    const image = e?.fileList[0] as IUploadedFile;
                                    return image?.originFileObj;
                                }}
                                rules={[{ required: true, message: 'Choose image for product!' }]}
                            >
                                <Upload
                                    showUploadList={{ showPreviewIcon: false }}
                                    beforeUpload={() => false}
                                    accept="image/*"
                                    listType="picture-card"
                                    maxCount={10}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            </div>
                            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button style={{ margin: 10 }} type="primary" htmlType="submit">
                                    Add
                                </Button>
                                <Button style={{ margin: 10 }} htmlType="button" onClick={() => navigate('/')}>
                                    Cancel
                                </Button>
                            </Row>
                        </Form>
                    </Row>
                    </div>

                </div>
            </div>
        </>
    )
        ;
};

export default AddProduct;
