import React, { Component } from "react";

import { Link } from 'react-router-dom';
import { Space, Table, Button, Popconfirm, Layout, Card, Input } from 'antd';
import { removeUserSession, getUser } from '../../Utils/common';
import { getStudent } from "./student.actionTypes";
import { SearchOutlined } from '@ant-design/icons';

import axios from 'axios';
import Nav from '../Header/header';
import history from '../../Utils/history';
import Highlighter from 'react-highlight-words';

const { Header, Content, Footer } = Layout;

class StudentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      students: [],
      user: [],
      searchText: '',
      searchedColumn: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/')
      .then(res => {
        this.setState({
          students: res.data
        });
        getStudent(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      user: getUser()
    });
  }

  componentDidUpdate(prevState) {

    if (this.state.students === prevState.students) {

    } else {
      axios.get('http://localhost:4000/students/')
        .then(res => {
          this.setState({
            students: res.data
          });
          getStudent(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
          text
        ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onChange = (pagination, sorter) => {
    console.log('params', pagination, sorter);
  }


  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['ascend', 'descend']
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...this.getColumnSearchProps('email'),
        sorter: (a, b) => a.email.length - b.email.length,
        sortDirections: ['ascend', 'descend']
      },
      {
        title: 'Roll No',
        dataIndex: 'rollno',
        key: 'rollno',
        ...this.getColumnSearchProps('rollno'),
        sorter: (a, b) => a.rollno - b.rollno,
        sortDirections: ['ascend', 'descend']
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
              <Card title="Students" className="view-student-card" bordered={false} hoverable={true}>
                <Table className="student-table" columns={columns} dataSource={this.state.students} onChange={this.onChange} />
              </Card>
            </div>
          </Content>
          <Footer>Copyrights 2020</Footer>
        </Layout>
      </div>
    );
  }
}

export default StudentList;
