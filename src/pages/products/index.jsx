import { useEffect, useState } from 'react';
import { Button, Card, Drawer, Form, Image, Space, Switch, Table, Tabs } from 'antd';
import { EditOutlined, DeleteOutlined, } from '@ant-design/icons'
import { useLoad, usePatchRequest, usePostRequest } from '../../hooks/request';
import { productsDelete, productsList, productsPatch, productsPost } from '../../constants/urls';
import { slugify } from '../../utils/helpers';
import useDeleteModal from '../../hooks/useDeleteModal';
import { FormTexts, FormRatings, FormPrices, FormImages, FormCharacteristic } from './components';


function Products() {
  const [form] = Form.useForm();
  const title = Form.useWatch('title', form);
  const postRequest = usePostRequest({ url: productsPost })
  const patchRequest = usePatchRequest()
  const [isUpdate, setIsUpdate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const deleteModal = useDeleteModal()

  const { response: products, loading, request: reload } = useLoad({ url: productsList })


  const columns = [
    {
      title: 'Image',
      dataIndex: 'mainImage',
      render: (image) => <Image src={image} width={150} height={70} style={{ objectFit: 'contain' }} />
    },
    {
      title: 'Title',
      dataIndex: 'model',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price) => <span>{price.toLocaleString()} sum</span>
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      render: (st) => <p>{st ? 'Bor' : 'Qolmagan'}</p>
    },
    {
      title: 'Is recommended',
      render: (item) => (
        <Switch checkedChildren="True" unCheckedChildren="False" defaultChecked={!!item.isRecommended} onChange={(e) => handleRecommended(e, item.id)} />
      )
    },
    {
      title: 'Actions',
      render: (item) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(item)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => deleteModal(productsDelete(item.id), reload)} />
        </Space>
      )
    }
  ];

  const handleRecommended = async (e, id) => {
    const { succes } = await patchRequest.request({ url: productsPatch(id), data: { isRecommended: e } })
    if (succes) {
      reload()
    }
  }

  const handleEdit = (item) => {
    form.setFieldsValue(item)
    setIsUpdate(item.id)
    setIsModalOpen(true)
  }

  const handleFinish = async (data) => {
    console.log(data)
    const { succes } = isUpdate ? await patchRequest.request({ url: productsPatch(isUpdate), data }) : await postRequest.request({ data })
    if (succes) {
      reload()
      handleCancel()
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setIsUpdate(null)
    form.resetFields()
  }

  const handleAdd = () => {
    setIsModalOpen(true)
  }

  const handleSubmit = () => {
    form.submit()
  }


  const items = [
    {
      key: '1',
      label: 'Text fields',
      children: <FormTexts />,
    },
    {
      key: '2',
      label: 'Rating fields',
      children: <FormRatings />,
    },
    {
      key: '3',
      label: 'Price fields',
      children: <FormPrices />,
    },
    {
      key: '4',
      label: 'Image fields',
      children: <FormImages form={form} />,
    },
    {
      key: '5',
      label: 'Characteristic fields',
      children: <FormCharacteristic form={form} />,
    },
  ];


  useEffect(() => {
    if (title && title.length) {
      form.setFieldValue('slug', slugify(title));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title])

  return (
    <div>
      <Card title='Products' extra={<Button onClick={handleAdd}>+ Add</Button>}>
        <Table dataSource={products} columns={columns} loading={loading} rowKey='id' />

        <Drawer title={`${isUpdate ? 'Update' : 'Add'} product`} onClose={handleCancel} open={isModalOpen} width={1000} extra={<Button onClick={handleSubmit}>{isUpdate ? 'Update' : 'Add'}</Button>}>
          <Form layout='vertical' form={form} onFinish={handleFinish}>
            <Tabs defaultActiveKey='1' items={items} type='card' />
          </Form>
        </Drawer>
      </Card>
    </div>
  )
}

export default Products