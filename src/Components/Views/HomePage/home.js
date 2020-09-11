import React from 'react';
import history from '../../Utils/history';
import { removeUserSession, getUser } from '../../Utils/common';

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
            <div>
                Welcome {this.state.user.name}<br /><br />
                <input type="button" onClick={this.handleLogout} value="Logout" />
            </div>
        );
    }
}

export default Home;