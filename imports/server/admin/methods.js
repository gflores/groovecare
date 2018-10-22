import { Meteor } from 'meteor/meteor';
import { DayResults } from '/imports/models/day-results';
import { Notifications } from '/imports/models/notifications';

function createHealthNotification(username, type, numberValue, scoreAdded) {
    if (isNaN(numberValue) == true || numberValue <= 0) {
        return ;
    }


    let user = Meteor.users.findOne({username: username});

    if (user == null) {
        return ;
    }

    let dayResult = DayResults.findOne({userId: user._id}, {sort: {createdAt: -1}});

    console.log("dayResult: ", dayResult);
    console.log("added: ", dayResult.groovePoints + scoreAdded);

    DayResults.update({ _id: dayResult._id }, {$set: {groovePoints: dayResult.groovePoints + scoreAdded}});

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
            fitRank: newRank
        });
    }
})