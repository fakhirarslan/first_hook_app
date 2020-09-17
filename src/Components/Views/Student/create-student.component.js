import React, { Component } from "react";

import { Form, Input, Button, Layout, Card, message } from 'antd';
import { removeUserSession, getUser } from '../../Utils/common';

import axios from 'axios';
import Nav from '../Header/header';
import history from '../../Utils/history';

import './student.style.css';

const { Header, Content, Footer } = Layout;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class CreateStudent extends Component {

  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      roll: '',
      user: []
    }
  }

  componentDidMount() {
    this.setState({
      user: getUser()
    });
  }

  handleLogout = () => {
    removeUserSession();
    history.push('/login');
    history.go();
  }

  onFinish = (values) => {
    console.log('Success:', values);
    this.setState({
      name: values.name,
      email: values.email,
      rollno: values.rollno
    });

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno
    };

    axios.post('http://localhost:4000/students/create-student', studentObject)
      .then(res => message.success(studentObject.name + " Added!"));

    this.setState({ name: '', email: '', rollno: '' })
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <div>
        <Layout className="layout">
          <Header>
            <Nav handleLogout={this.handleLogout} user={this.state.user} />
          </Header>
          <Content>
            <div className="site-layout-content">
              <Card title="Add Student" className="add-student-card" bordered={false} hoverable={true}>
                <Form
                  {...layout}
                  name="basic"
                  className="student-add-form"
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                  <Form.Item
                    label="name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="rollno"
                    name="rollno"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Roll No!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Add
						        </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </Content>
          <Footer>Copyrights 2020</Footer>
        </Layout>
      </div>
    );
  }
}

export default CreateStudent;
