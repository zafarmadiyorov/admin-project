/* eslint-disable no-unused-vars */
import { Button, Col, Form, Input, Row, Space } from "antd"
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

function FormCharacteristic(props) {
    // eslint-disable-next-line react/prop-types
    const { form } = props

    return (
        <Row>
            <Col span={24}>
                <Form.List
                    name="attributes"
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, i) => (
                                <Form.Item
                                    label='Characteristic'
                                    key={i}
                                >
                                    <Space style={{alignItems: 'flex-start'}}>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'title']}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: 'Please add title'
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Type title of characteristic" />
                                        </Form.Item>

                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'value']}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: 'Please add value'
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Type value of characteristic" />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    </Space>
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

export default FormCharacteristic