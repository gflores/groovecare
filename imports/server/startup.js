import { DayResults } from '/imports/models/day-results';
import { Notifications } from '/imports/models/notifications';
import { Invoices } from '/imports/models/invoices';

Meteor.publish("day-results", () => {
  return DayResults.find();
});

Meteor.publish("notifications", () => {
  return Notifications.find();
});

Meteor.publish("invoices", () => {
  return Invoices.find();
});