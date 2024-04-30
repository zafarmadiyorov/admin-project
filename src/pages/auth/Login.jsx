// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
// eslint-disable-next-line no-unused-vars
import { Button, Card, Form, Input, message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const { addToken } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const onFinish = (values) => {
    setLoading(true)
    axios.post('https://99df436dc699e000.mokky.dev/auth', values).then((res) => {
      if (res.data.token) {
        addToken(res.data.token);
        navigate('/')
      }
    }).catch(err => console.log(err, '🔥🔥🔥')).finally(() => setLoading(false))
  };



  return (
    <div className='login-page'>

      <Card title='login' style={{ width: 300 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>

    </div>
  )
}

export default Login