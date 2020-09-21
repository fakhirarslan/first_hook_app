import React, { Component } from "react";

import axios from 'axios';
import Nav from '../Header/header';
import history from '../../Utils/history';

import { Form, Input, Button, Layout, Card } from 'antd';
import { removeUserSession, getUser } from '../../Utils/common';
import { SyncOutlined } from '@ant-design/icons';

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

class EditStudent extends Component {

  constructor(props) {
    super(props)

    // State
    this.state = {
      name: '',
      email: '',
      rollno: '',
      user: [],
      isLoading: true
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/edit-student/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno,
          isLoading: false
        });
      })
      .catch((error) => {
        console.log(error);
      });

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
    var name = '';
    var email = '';
    var rollno = '';

    values.name ? name = values.name : name = this.state.name;
    values.email ? email = values.email : email = this.state.email;
    values.rollno ? rollno = values.rollno : rollno = this.state.rollno;

    const studentObject = {
      name: name,
      email: email,
      rollno: rollno
    };

    axios.put('http://localhost:4000/students/update-student/' + this.props.match.params.id, studentObject)
      .then((res) => {
        console.log('Student successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Student List 
    this.props.history.push('/student-list');
  };

  nameChange = (e) => {
    if (e.target.value === '') {
      document.getElementsByClassName("ant-card-head-title")[0].innerHTML = this.state.name;
    } else { 
      document.getElementsByClassName("ant-card-head-title")[0].innerHTML = e.target.value; 
    }
  }

  render() {
    return (
      <div>
        <Layout className="layout">
          <Header>
            <Nav handleLogout={this.handleLogout} user={this.state.user} />
          </Header>
          <Content>
            <div className="site-layout-content">
              <Card title={this.state.isLoading ? <SyncOutlined spin /> : this.state.name} className="edit-student-card" bordered={false} hoverable={true} >
                <Form
                  {...layout}
                  name="basic"
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                  <Form.Item
                    label="name"
                    name="name"
                    rules={[
                      {
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input placeholder={this.state.name} onChange={this.nameChange} />
                  </Form.Item>

                  <Form.Item
                    label="email"
                    name="email"
                    rules={[
                      {
                        message: 'Please input your email!',
                      },
                    ]}
                  >
                    <Input placeholder={this.state.email} />
                  </Form.Item>

                  <Form.Item
                    label="rollno"
                    name="rollno"
                    rules={[
                      {
                        message: 'Please input your Roll No!',
                      },
                    ]}
                  >
                    <Input placeholder={this.state.rollno} />
                  </Form.Item>

                  <Form.Item {...tailLayout} className="edit-student-form">
                    <Button type="primary" htmlType="submit">
                      Update
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

export default EditStudent;
