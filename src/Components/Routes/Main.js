import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from '../Views/Login/login';
import Register from '../Views/Register/register';
import Home from '../Views/HomePage/home';

import { getUser } from '../Utils/common';

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            loggedIn: false
        }
    }

    toggleLoggedIn = () => {
        this.setState({
            loggedIn: !this.state.loggedIn
        })
    }

    render() {
        console.log(this.state.loggedIn);
        if (!this.state.loggedIn) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/"><Login /></Route>
                        {getUser() ? null : <Route exact path="/login"><Login toggleLoggedIn={this.toggleLoggedIn} /></Route>}
                        {getUser() ? null : <Route exact path="/register"><Register /></Route>}
                        {getUser() ? <Route exact path="/home"><Home /></Route> : <Route exact path="/login"><Login /></Route>}
                        {getUser() ? <Redirect to="/home" /> : <Redirect to="/login" />}
                    </Switch>
                </BrowserRouter>
            );
        } else {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/home"><Login /></Route>
                    </Switch>
                </BrowserRouter>
            );
        }
    }
}

export default Main;