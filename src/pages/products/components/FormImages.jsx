/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row, Select } from "antd"
import { useLoad } from "../../../hooks/request";
import { brandsList, categoriesList } from "../../../constants/urls";
import { isUrlValid } from "../../../utils/helpers";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'


function FormImages(props) {
    const { form } = props

    const { response: categories, categoriesLoading } = useLoad({ url: categoriesList })
    const { response: brands, brandsLoading } = useLoad({ url: brandsList })

    return (
        <Row>
            <Col span={24}>
                <Form.Item label="Brand" name='brand_id' rules={[
                    {
                        type: 'number',
                        required: true,
                        message: 'Maydon bo\'sh',
                    }
                ]}>
                    <Select
                        loading={brandsLoading}
                        onChange={(e) => form.setFieldValue('brands_id', e)}
                        options={brands?.map(item => ({ value: item.id, label: item.title }))}
                    />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item label="Category" name='category_id'>
                    <Select
                        loading={categoriesLoading}
                        onChange={(e) => form.setFieldValue('category_id', e)}
                        options={categories?.map(item => ({ value: item.id, label: item.title }))}
                    />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item label="Main image" name='mainImage' rules={[{
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
            </Col>
            <Col span={24}>
                <Form.List
                    name="images"
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field) => (
                                <Form.Item
                                    label='Image Url'
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                validator: (_, value) => {
                                                    if (isUrlValid(value)) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Is not URL!'))
                                                },
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="passenger name" style={{ width: '90%', marginRight: 10 }} />
                                    </Form.Item>
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<PlusOutlined />}
                                >
                                    Add field
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Col>
        </Row>
    )
}

export default FormImages