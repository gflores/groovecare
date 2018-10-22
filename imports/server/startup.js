import { DayResults } from '/imports/models/day-results';
import { Notifications } from '/imports/models/notifications';
import { Invoices } from '/imports/models/invoices';
import { Accounts } from 'meteor/accounts-base';

import './admin/methods';

Meteor.publish("day-results", function() {
  return DayResults.find({
    userId: this.userId
  });
});

Meteor.publish("notifications", function() {
  return Notifications.find({
    userId: this.userId
  });
});

Meteor.publish("invoices", function() {
  return Invoices.find({
    userId: this.userId
  });
});

Accounts.onCreateUser((options, user) => {
    DayResults.insert({
        userId: user._id,
        createdAt: new Date(),
        groovePoints: 0,
        fitRank: 50
    });

    return user;
});