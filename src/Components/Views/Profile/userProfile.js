import React from 'react';
import { Layout, Row, Col, Card, Divider } from 'antd';
import history from '../../Utils/history';
import { removeUserSession, getUser } from '../../Utils/common';
import Nav from '../Header/header';
import { MailOutlined, PhoneOutlined, TeamOutlined } from '@ant-design/icons';
import '../Profile/style.css';

const { Header, Content, Footer } = Layout;

class UserProfile extends React.Component {

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
                    <Nav handleLogout={this.handleLogout} user={this.state.user} />
                </Header>
                <Content>
                    <div className="site-layout-content">
                        <Row>
                            <Col span={6}>
                                <Card className="profile-card" hoverable={true} title={<><TeamOutlined />&nbsp;<h5>Username</h5></>} bordered={false}>
                                    {this.state.user.name}
                                </Card>
                            </Col>
                            <Divider type="vertical" />
                            <Col span={6}>
                                <Card className="profile-card" hoverable={true} title={<><MailOutlined />&nbsp;<h5>Email</h5></>} bordered={false}>
                                    {this.state.user.email}
                                </Card>
                            </Col>
                            <Divider type="vertical" />
                            <Col span={6}>
                                <Card className="profile-card" hoverable={true} title={<><PhoneOutlined />&nbsp;<h5>Contact</h5></>} bordered={false}>
                                    {this.state.user.phone}
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Content>
                <Footer>Copyrights 2020</Footer>
            </Layout>
        );
    }
}

export default UserProfile;