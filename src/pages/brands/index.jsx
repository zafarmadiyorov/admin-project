import { useState } from 'react';
import { Button, Card, Col, Form, Input, Modal, Row } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useLoad, usePatchRequest, usePostRequest } from '../../hooks/request';
import { brandsDelete, brandsList, brandsPatch, brandsPost } from '../../constants/urls';
import { isUrlValid } from '../../utils/helpers';
import useDeleteModal from '../../hooks/useDeleteModal';

const { Meta } = Card
function BrandPage() {
    const [form] = Form.useForm();
    const postRequest = usePostRequest({ url: brandsPost })
    const patchRequest = usePatchRequest()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUpdate, setIsUpdate] = useState(null);
    const deleteModal = useDeleteModal()
    const { response: brands, loading, request: reload } = useLoad({ url: brandsList })

    const handleAdd = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setIsUpdate(null)
        form.resetFields()
    }

    const handleSubmit = () => {
        form.submit()
    }

    const handleFinish = async (data) => {
        const { success } = isUpdate ? await patchRequest.request({ url: brandsPatch(isUpdate), data }) : await postRequest.request({ data })
        if (success){
            reload()
            handleCancel()
        }
    }

    const handleDelete = (id) => {
        deleteModal(brandsDelete(id), reload)
    }

    const handleEdit = (item) => {
        form.setFieldsValue(item)
        setIsUpdate(item.id)
        setIsModalOpen(true)
    }


    return (
        <div>
            <Card title='Brands' extra={<Button onClick={handleAdd}>+ Add Brands</Button>} loading={loading}>
                <Row gutter={[16,16]}>
                    {
                        brands?.map(({ id, image, title }) => (
                            <Col key={id}>
                                <Card
                                    style={{
                                        width: 300,
                                        height: 300,
                                        overflow: 'hidden',
                                    }}
                                    cover={
                                        <img
                                            alt="example"
                                            src={image}
                                            style={{width: 300, height: 180, objectFit: 'contain'}}
                                        />
                                    }
                                    actions={[
                                        <Button key="setting" danger onClick={() => handleDelete(id)}>
                                            <DeleteOutlined />
                                        </Button>,
                                        <Button key="edit" onClick={() => handleEdit({ id, image, title })} loading={loading}>
                                            <EditOutlined />
                                        </Button>,
                                    ]}
                                >
                                    <Meta title={title} />
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Card>

            <Modal
                maskClosable={false}
                title={isUpdate ? "Update brand" : "Add brand"}
                open={isModalOpen}
                onCancel={handleCancel}
                okText={isUpdate ? 'Update' : 'Add'}
                onOk={handleSubmit}
            >
                <Form form={form} onFinish={handleFinish}>
                    <Form.Item label="Title" name='title' rules={[{
                        type: 'string',
                        required: true,
                        message: 'Maydon Bo\'sh'
                    }]}>
                        <Input placeholder='Apple' />
                    </Form.Item>
                    <Form.Item label="Image url" name='image' rules={[{
                        type: 'string',
                        required: true,
                        validator: (_, value) => {
                            if (isUrlValid(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Is not URL!'))
                        },
                    }]}>
                        <Input type='url' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default BrandPage