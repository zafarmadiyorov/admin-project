import { Col, Form, Input, Row } from "antd"

function FormTexts() {
    return (
        <Row>
            <Col span={24}>
                <Form.Item label="Title" name='title' rules={[{
                    type: 'string',
                    required: true,
                    message: 'Maydon Bo\'sh'
                }]}>
                    <Input />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item style={{ display: 'none' }} label="Slug" name='slug' rules={[{
                    type: 'string',
                    required: true,
                    message: 'Maydon Bo\'sh'
                }]}>
                    <Input />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item label="Model" name='model' rules={[{
                    type: 'string',
                    required: true,
                    message: 'Maydon Bo\'sh'
                }]}>
                    <Input />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item label="Description" name='desc' rules={[{
                    type: 'string',
                    required: true,
                    message: 'Maydon Bo\'sh',
                    min: 120
                }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Col>
        </Row>
    )
}

export default FormTexts