import {Button, Form, Input, InputNumber, Row, Select, Upload} from "antd";
import { PlusOutlined} from '@ant-design/icons';
import type {UploadChangeParam} from 'antd/es/upload';
import {useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {ICategoryName, IProductCreate} from "../../types.ts";
import http_common from "../../../http_common.ts";
import {IUploadedFile} from "../../types.ts";
import {useEffect, useState} from "react";

const PostCreatePage = () => {
    const [categories, setCategories] = useState<ICategoryName[]>([]);
    const navigate = useNavigate();

    const [form] = Form.useForm<IProductCreate>();

    useEffect(() => {
        http_common.get<ICategoryName[]>("/api/categories/names")
            .then(resp=> {
                //console.log("list categories", resp.data);
                setCategories(resp.data);
            });
    },[]);

    const onSubmit = async (values: IProductCreate) => {
        console.log("data", values);
        try {
            await http_common.post("/api/posts", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate("/");
        }
        catch(ex) {
            console.log("Exception create category", ex);
        }
    }

    const categoriesData = categories?.map(item => ({label: item.name, value: item.id}));

    return (
        <>
            <h1>Add Product</h1>
            <Row gutter={16}>
                <Form form={form}
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
                    <Form.Item
                        label="Name"
                        name="name"
                        htmlFor="name"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {min: 3, message: 'Name must have at least 3 symbols!'},
                        ]}
                    >
                        <Input autoComplete="name"/>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        htmlFor="description"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {min: 10, message: 'Name must have at least 10 symbols!'},
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category_id"
                        htmlFor="category_id"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                        ]}
                    >
                        <Select
                            placeholder="Select the category: "
                            options={categoriesData}
                        />
                    </Form.Item>

                    <Form.Item
                        label="SubCategory"
                        name="Subcategory_id"
                        htmlFor="Subcategory_id"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                        ]}
                    >
                        <Select
                            placeholder="Select the SubCategory: "
                            options={categoriesData}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        htmlFor="price"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {type: 'number'}
                        ]}
                    >
                        <InputNumber min={0} autoComplete="off"/>
                    </Form.Item>

                    <Form.Item
                        label="Size"
                        name="size_id"
                        htmlFor="size_id"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                        ]}
                    >
                        <Select
                            placeholder="Select the size: "
                            options={categoriesData}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Color"
                        name="color"
                        htmlFor="color"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {min: 3, message: 'Color must have at least 3 symbols!'},
                        ]}
                    >
                        <Input autoComplete="off"/>
                    </Form.Item>


                    <Form.Item
                        label="Brand"
                        name="brand_id"
                        htmlFor="brand_id"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                        ]}
                    >
                        <Select
                            placeholder="Select the brand: "
                            options={categoriesData}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Gender"
                        name="Gender_id"
                        htmlFor="Gender_id"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                        ]}
                    >
                        <Select
                            placeholder="Select the Gender: "
                            options={categoriesData}
                        />
                    </Form.Item>


                    <Form.Item
                        label="SizeAndFit"
                        name="sizeAndFit"
                        htmlFor="sizeAndFit"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {min: 10, message: 'sizeAndFit must have at least 10 symbols!'},
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>

                    <Form.Item
                        label="LookAfterMe"
                        name="lookAfterMe"
                        htmlFor="lookAfterMe"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {min: 10, message: 'lookAfterMe must have at least 10 symbols!'},
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>


                    <Form.Item
                        label="AboutMe"
                        name="aboutMe"
                        htmlFor="aboutMe"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {min: 10, message: 'aboutMe must have at least 10 symbols!'},
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>


                    <Form.Item
                        label="Amount"
                        name="amount"
                        htmlFor="amount"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {type: 'number'}
                        ]}
                    >
                        <InputNumber min={0} autoComplete="off"/>
                    </Form.Item>


                    <Form.Item
                        name="files"
                        label="Images"
                        valuePropName="files"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const image = e?.fileList[0] as IUploadedFile;
                            return image?.originFileObj;
                        }}
                        rules={[{required: true, message: 'Choose image for category!'}]}
                    >
                        <Upload
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={10}
                        >
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Add
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={() =>{ navigate('/')}}>
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </Row>
        </>
    )
}

export default PostCreatePage;