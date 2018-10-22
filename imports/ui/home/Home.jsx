import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Dashboard } from './dashboard/Dashboard.jsx';
import { Account } from './account/Account.jsx';

import './home.scss';

export class Home extends Component {
    componentWillMount() {
        this.goToDashboard();
    }

    goToDashboard() {
        this.setState({subPage: "dashboard"});
    }

    goToAccount() {
        console.log("okay bro");
        this.setState({subPage: "account"});
    }

    render() {
        return <div className="home">
            { this.state.subPage == "dashboard" ?
                <Dashboard goToAccount={ this.goToAccount.bind(this) } />
            :
                <Account goToDashboard={ this.goToDashboard.bind(this) } />
            }
        </div>;
    }
}