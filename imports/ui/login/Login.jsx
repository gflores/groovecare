import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { AccountsUIWrapper } from './AccountsUIWrapper';

require("./login.scss");

export class Login extends Component {

    render() {
        return <div className="login">
            <AccountsUIWrapper />

            <a className="log-as-admin" onClick={ this.props.goToAdmin } href="#">Log as Admin</a>
        </div>;
    }
}