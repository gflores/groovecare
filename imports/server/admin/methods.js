import { Meteor } from 'meteor/meteor';
import { DayResults } from '/imports/models/day-results';
import { Notifications } from '/imports/models/notifications';
import { Invoices } from '/imports/models/invoices';

let MAX_POINTS = 200;

function createHealthNotification(username, type, numberValue, scoreAdded) {
    if (isNaN(numberValue) == true || numberValue <= 0) {
        return ;
    }


    let user = Meteor.users.findOne({username: username});

    if (user == null) {
        return ;
    }

    let dayResult = DayResults.findOne({userId: user._id}, {sort: {createdAt: -1}});
    let resultingPoints = Math.min(dayResult.groovePoints + scoreAdded, MAX_POINTS);

    DayResults.update({ _id: dayResult._id }, {$set: {groovePoints: resultingPoints}});

    Notifications.insert({
        userId: user._id,
        type: type,
        amount: numberValue,
        scoreAdded: scoreAdded,
        createdAt: new Date(),
        dismissed: false
    });
}

Meteor.methods({
    "add-sleeping-hours": (username, value) => {
        let numberValue = Number(value);

        createHealthNotification(username, "sleep-score", numberValue, Math.round(numberValue * 2));
    },

    "add-jogging-hours": (username, value) => {
        let numberValue = Number(value);

        createHealthNotification(username, "jogging-score", numberValue, Math.round(numberValue * 1.1));
    },

    "add-intensive-hours": (username, value) => {
        let numberValue = Number(value);

        createHealthNotification(username, "intensive-score", numberValue, Math.round(numberValue * 2));
    },

    "trigger-next-day": (username) => {
        let user = Meteor.users.findOne({username: username});

        let dayResult = DayResults.findOne({userId: user._id}, {sort: {createdAt: -1}});
        let newRank;

        if (dayResult == null) {
            newRank = 50;
        } else {
            newRank = dayResult.fitRank;

            if (dayResult.groovePoints >= newRank) {
                newRank += 1;
            } else {
                newRank -= 1;
            }
        }

        Notifications.update(
            {userId: user._id, dismissed: false},
            {$set: {dismissed: true}},
            {multi: true}
        );

        DayResults.insert({
            userId: user._id,
            createdAt: new Date(),
            groovePoints: 0,
            fitRank: newRank,
            paid: false
        });
    },

    "trigger-next-month": (username) => {
        let user = Meteor.users.findOne({username: username});

        let dayResults = DayResults.find({userId: user._id, paid: false}, {sort: {createdAt: -1}}).fetch();

        if (dayResults.length == 0) {
            return ;
        }

        let DAILY_PRICE = 12, REDUCTION_PER_POINT = 0.02;
        let numberOfDays = dayResults.length;
        let accumulatedGroovePoints = 0

        dayResults.forEach((dayResult) => {
            accumulatedGroovePoints += dayResult.groovePoints;
        });

        let amountToPay = Math.round((DAILY_PRICE * numberOfDays) - (accumulatedGroovePoints * REDUCTION_PER_POINT * (1 + dayResults[0].fitRank / 100)));

        DayResults.update(
            {userId: user._id, paid: false},
            {$set: {paid: true}},
            {multi: true}
        );

        Invoices.insert({
            userId: user._id,
            createdAt: new Date(),
            amountToPay: amountToPay
        });

        Meteor.call("trigger-next-day", username);
    }
})