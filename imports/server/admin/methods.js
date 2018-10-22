import { Meteor } from 'meteor/meteor';
import { DayResults } from '/imports/models/day-results';
import { Notifications } from '/imports/models/notifications';

function createHealthNotification(username, type, numberValue) {
    console.log("numberValue: ", numberValue);

    if (isNaN(numberValue) == true || numberValue <= 0) {
        return ;
    }

    console.log("END");

    let user = Meteor.users.findOne({username: username});

    Notifications.insert({
        userId: user._id,
        type: type,
        amount: numberValue,
        createdAt: new Date()
    });
}

Meteor.methods({
    "add-sleeping-hours": (username, value) => {
        let numberValue = Number(value);

        createHealthNotification(username, "sleep-score", numberValue);
    },

    "add-jogging-hours": (username, value) => {
        let numberValue = Number(value);

        createHealthNotification(username, "jogging-score", numberValue);
    },

    "add-intensive-hours": (username, value) => {
        let numberValue = Number(value);

        createHealthNotification(username, "intensive-score", numberValue);
    }    
})