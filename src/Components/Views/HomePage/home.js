import React from 'react';
import { Layout, Menu, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import history from '../../Utils/history';
import { removeUserSession, getUser } from '../../Utils/common';

const { Header, Content, Footer } = Layout;

class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            user: {}
        }
    }

    handleLogout = () => {
        removeUserSession();
        history.push('/login');
        history.go();
    }

    componentDidMount() {
        this.setState({
            user: getUser()
        });
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    {/* Welcome {this.state.user.name}<br /><br /> */}
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">Home</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                        <Menu.Item key="4"><Button danger onClick={this.handleLogout}>Logout</Button></Menu.Item>
                        <Menu.Item key="5">
                            <Avatar size={40} icon={<UserOutlined />} />
                        </Menu.Item>
                    </Menu>

                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">Content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Copyrights 2020</Footer>
            </Layout>
        );
    }
}

export default Home;