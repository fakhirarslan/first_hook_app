import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

class header extends React.Component {

    render() {
        return (
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1"><Link to="/home">Home</Link></Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
                <Menu.SubMenu className="avatar" icon={<UserOutlined />}>
                    <Menu.Item key="4">
                        <Link to="/userProfile">{this.props.user.name}</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <p onClick={this.props.handleLogout}>Logout</p>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        );
    }
}

export default header;
