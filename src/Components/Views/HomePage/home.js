import React from 'react';
import { Layout } from 'antd';
import history from '../../Utils/history';
import { removeUserSession, getUser } from '../../Utils/common';
import Nav from '../Header/header';

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
                    <Nav handleLogout={this.handleLogout} user={this.state.user} />
                </Header>
                <Content>
                    <div className="site-layout-content">
                        Content
                    </div>
                </Content>
                <Footer>Copyrights 2020</Footer>
            </Layout>
        );
    }
}

export default Home;