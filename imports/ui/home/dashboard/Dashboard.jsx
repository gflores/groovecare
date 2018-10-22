import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { get } from 'lodash';
import { Notification } from './notification/Notification.jsx';

require("./dashboard.scss");


export class Dashboard extends Component {

    renderDayStats() {
        return <div className="day-stats">
            <div className="stats">
                <div className="label">
                    <svg viewBox="0 0 640 512">
                        <path fill="currentColor" d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z"></path>
                    </svg>
                </div>
                <div className="value">5h</div>
            </div>
            <div className="stats">
                <div className="label">
                    <svg viewBox="0 0 416 512">
                        <path fill="currentColor" d="M126.16 316.86l-19.85 46.28c-1.27 2.95-4.14 4.86-7.35 4.86H24.01C10.76 368 0 378.75 0 392s10.76 24 24.01 24h74.95c22.43 0 42.65-13.31 51.5-33.94l13.55-31.6-9.56-5.77c-11.88-7.18-21.22-16.87-28.29-27.83zM272.15 96c26.52 0 48.03-21.49 48.03-48s-21.5-48-48.03-48-48.03 21.49-48.03 48 21.51 48 48.03 48zm119.91 144.56l-48.4-.17c-3.53-.02-6.6-2.3-7.61-5.66l-13.95-45.92c-9.19-30.19-34.02-53.27-64.82-60.23l-78.25-17.7c-25.73-5.86-52.45.08-73.26 16.22L57.4 164.46c-10.49 8.09-12.43 23.17-4.31 33.66 8.08 10.5 23.23 12.41 33.68 4.31l48.39-37.36c9.46-7.33 21.68-9.92 33.3-7.38l14.88 3.37-35.3 87.35c-10.35 25.62-.69 54.59 22.98 68.91l83.78 50.58a8.004 8.004 0 0 1 3.55 9.05l-33.3 104.47c-3.64 12.75 3.74 26.03 16.49 29.67 2.2.62 4.42.92 6.61.92 10.44 0 20.06-6.86 23.08-17.41l33.3-104.47c6.93-24.25-3.31-50.28-24.9-63.33l-51.85-31.3 41.94-104.8c2.72 3.64 5.06 7.59 6.42 12.07l13.96 45.94c7.21 23.66 28.67 39.61 53.41 39.69l48.4.17h.08c13.23 0 23.97-10.69 24.01-23.92.05-13.26-10.66-24.04-23.94-24.09z">
                        </path>
                    </svg>
                </div>
                <div className="value">37m</div>
            </div>
            <div className="stats">
                <div className="label">
                    <svg viewBox="0 0 512 512">
                        <path fill="currentColor" d="M320.2 243.8l-49.7 99.4c-6 12.1-23.4 11.7-28.9-.6l-56.9-126.3-30 71.7H60.6l182.5 186.5c7.1 7.3 18.6 7.3 25.7 0L451.4 288H342.3l-22.1-44.2zM473.7 73.9l-2.4-2.5c-51.5-52.6-135.8-52.6-187.4 0L256 100l-27.9-28.5c-51.5-52.7-135.9-52.7-187.4 0l-2.4 2.4C-10.4 123.7-12.5 203 31 256h102.4l35.9-86.2c5.4-12.9 23.6-13.2 29.4-.4l58.2 129.3 49-97.9c5.9-11.8 22.7-11.8 28.6 0l27.6 55.2H481c43.5-53 41.4-132.3-7.3-182.1z">
                        </path>
                    </svg>
                </div>
                <div className="value">5m</div>
            </div>
        </div>
    }

    renderFitRank() {
        return <div className="fit-rank">
            <div className="label"> Fit Rank: 68/100</div>
            <div className="description">
                <span className="number"> +$974 </span>
                <span className="text"> saved yearly </span>
            </div>
        </div>

    }

    renderNotifications() {
        let notifications = [
            // {type: "jog-score", amount: 8},
            // {type: "intensive-score", amount: 7},
            {type: "jog-score", amount: 7},
            // {type: "sleep-score", amount: 2},
            {type: "intensive-score", amount: 5},
            {type: "jog-score", amount: 30},
            {type: "sleep-score", amount: 5}
        ]; //92

        console.log("this.props.notifications: ", this.props.notifications)

        return <div className="notifications">
            { this.props.notifications.map((notification, index) => (
                <Notification notification={ notification } key={ index }/>
            )) }
        </div>
    }

    render() {
        return <div className="dashboard">
            <div className="account-button">
                <svg className="icon" viewBox="0 0 512 512" onClick={ this.props.goToAccount }>
                    <path fill="currentColor" d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z">
                    </path>
                </svg>
            </div>

            <div className="today-date">
                { moment().format('MMM D, YYYY') }
            </div>

            { this.renderDayStats() }
            { this.renderFitRank() }

            <div className="main-score-display">
                <div className="center-part">
                    <div className="groove-points">
                        <div className="value"> { get(this.props, "dayResults[0].groovePoints", 0) } </div>
                        <div className="label"> Groove Points </div>
                    </div>
                </div>
            </div>

            <div className="your-activity">
                <div className="label"> Your Activity </div>
                { this.renderNotifications() }
            </div>

        </div>
    }
}