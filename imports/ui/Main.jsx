import React, { Component } from 'react';

// import { TriggerSection } from '/imports/ui/trigger-section/TriggerSection.jsx';

import { composeWithTracker } from 'react-komposer';

import { DayResults } from '/imports/models/day-results';
import { Notifications } from '/imports/models/notifications';
import { Invoices } from '/imports/models/invoices';

require("./main.scss");

class _Main extends Component {
    render() {
        console.log("ma props: ", this.props)

        return (
            <div className="main">
                <div className="brand-name"> GrooveCare</div>
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
            dayResults: DayResults.find().fetch(),
            notifications: Notifications.find().fetch(),
            invoices: Invoices.find().fetch()
        });
    }
})(_Main);