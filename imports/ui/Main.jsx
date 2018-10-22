import React, { Component } from 'react';

// import { TriggerSection } from '/imports/ui/trigger-section/TriggerSection.jsx';

import { composeWithTracker } from 'react-komposer';

import { DayResults } from '/imports/models/day-results';
import { Notifications } from '/imports/models/notifications';
import { Invoices } from '/imports/models/invoices';

import { Login } from './login/Login.jsx';
import { Admin } from './admin/Admin.jsx';
import { Home } from './home/Home.jsx';

require("./main.scss");

class _Main extends Component {
    componentWillMount() {
        this.goToHome();
    }

    goToHome() {
        this.setState({subPage: "home"});
    }

    goToAdmin() {
        this.setState({subPage: "admin"});
    }

    render() {
        console.log("ma props: ", this.props)

        return (
            <div className="main">
                <header>
                    <div className="logo"> GrooveCare </div>
                </header>
                <content>
                    { this.state.subPage == "admin" ?
                        <Admin goToHome={ this.goToHome.bind(this) }/>
                    :(this.props.user == null ?
                        <Login goToAdmin={ this.goToAdmin.bind(this) }/>
                    :
                        <Home notifications={ this.props.notifications } invoices={ this.props.invoices } dayResults={ this.props.dayResults }/>
                    )}
                </content>
            </div>
        );
    }
}

export const Main = composeWithTracker((props, onData) => {
    let dayResultsSubscription = Meteor.subscribe("day-results");
    let notificationSubscription = Meteor.subscribe("notifications");
    let invoicesSubscription = Meteor.subscribe("invoices");

    if (dayResultsSubscription.ready() && notificationSubscription.ready() && invoicesSubscription.ready()) {
        onData(null, {
            user: Meteor.user(),
            dayResults: DayResults.find({}, {sort: {createdAt: -1}}).fetch(),
            notifications: Notifications.find({}, {sort: {createdAt: -1}}).fetch(),
            invoices: Invoices.find({}, {sort: {createdAt: -1}}).fetch()
        });
    }
})(_Main);