import React from 'react';
import { Layout, Menu } from 'antd';
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
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">Home</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                        <Menu.SubMenu className="avatar" icon={<UserOutlined />}>
                            <Menu.Item key="4">{this.state.user.name}</Menu.Item>
                            <Menu.Item key="5">
                                <p onClick={this.handleLogout}>Logout</p>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Header>
                <Content>
                    <div className="site-layout-content">Content</div>
                </Content>
                <Footer>Copyrights 2020</Footer>
            </Layout>
        );
    }
}

export default Home;