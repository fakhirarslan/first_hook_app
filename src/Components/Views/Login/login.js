import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { login } from '../../UserFunctions/functions';
import history from '../../Utils/history';
import '../Login/loginStyle.css';

function Login(props) {

    const onFinish = values => {
        const user = {
            email: values.username,
            password: values.password
        };
        login(user)
            .then(res => {
                console.log(res);
                if (res.data.status === "No User") {
                    message.error("Email or Password Does Not Match");
                } else {
                    props.toggleLoggedIn();
                    props.dispatch(props.getLoggedUser(res.data));
                    history.push(`/home`);
                    history.go();
                }
            })
            .catch(err => {
                message.error("No Internet!");
            });
    };

    return (
        <div className="site-card-border-less-wrapper">
            <Card title="Login Form" bordered={false} hoverable={true}>
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

                    <Form.Item className="login-item">
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                         &nbsp;Or <Link to="/register">Register now</Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Login;
