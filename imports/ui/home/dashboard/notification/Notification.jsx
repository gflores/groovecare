import React, { Component } from 'react';
import ReactDOM from 'react-dom';

require("./notification.scss");

export class Notification extends Component {

    render() {
        return <div className="notification">
            type: {this.props.notification.type}
            amount: {this.props.notification.amount}
        </div>
    }
}