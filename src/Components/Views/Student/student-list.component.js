import React, { Component } from "react";

import { Link } from 'react-router-dom';
import { Space, Table, Button, Popconfirm, Layout } from 'antd';
import { removeUserSession, getUser } from '../../Utils/common';

import axios from 'axios';
import Nav from '../Header/header';
import history from '../../Utils/history';

const { Header, Content, Footer } = Layout;

class StudentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      students: [],
      user: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/')
      .then(res => {
        this.setState({
          students: res.data
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

  deleteStudent = (id) => {
    axios.delete('http://localhost:4000/students/delete-student/' + id)
      .then((res) => {
        console.log('Student successfully deleted!');
        this.componentDidMount();
      }).catch((error) => {
        console.log(error);
      })
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Roll No',
        dataIndex: 'rollno',
        key: 'rollno',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Link to={"/edit-student/" + record._id}>Edit</Link>
            <Popconfirm title="Are you sure?" onConfirm={() => this.deleteStudent(record._id)} okText="Yes" cancelText="No">
              <Button type="primary" danger>Delete</Button>
            </Popconfirm>

          </Space>
        ),
      },
    ];

    return (
      <div>
        <Layout className="layout">
          <Header>
            <Nav handleLogout={this.handleLogout} user={this.state.user} />
          </Header>
          <Content>
            <div className="site-layout-content">
              <Table columns={columns} dataSource={this.state.students} />
            </div>
          </Content>
          <Footer>Copyrights 2020</Footer>
        </Layout>
      </div>
    );
  }
}

export default StudentList;
