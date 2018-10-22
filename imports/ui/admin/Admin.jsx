import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Admin extends Component {

    handleSubmitSleepingHours(event) {
        event.preventDefault();

        let value = ReactDOM.findDOMNode(this.refs.sleepInput).value.trim();
        let username = ReactDOM.findDOMNode(this.refs.usernameInput).value.trim();

        Meteor.call('add-sleeping-hours', username, value);

        console.log("VAL: ", username, value);

        ReactDOM.findDOMNode(this.refs.sleepInput).value = '';
    }

    handleSubmitJoggingHours(event) {
        event.preventDefault();

        let value = ReactDOM.findDOMNode(this.refs.joggingInput).value.trim();
        let username = ReactDOM.findDOMNode(this.refs.usernameInput).value.trim();

        Meteor.call('add-jogging-hours', username, value);

        console.log("VAL: ", username, value);

        ReactDOM.findDOMNode(this.refs.joggingInput).value = '';
    }

    handleSubmitIntensiveHours(event) {
        event.preventDefault();

        let value = ReactDOM.findDOMNode(this.refs.intensiveInput).value.trim();
        let username = ReactDOM.findDOMNode(this.refs.usernameInput).value.trim();

        Meteor.call('add-intensive-hours', username, value);

        console.log("VAL: ", username, value);

        ReactDOM.findDOMNode(this.refs.intensiveInput).value = '';
    }

    handleTriggerNextDay() {
        let username = ReactDOM.findDOMNode(this.refs.usernameInput).value.trim();

        Meteor.call('trigger-next-day', username);
    }

    handleTriggerNextMonth() {
        let username = ReactDOM.findDOMNode(this.refs.usernameInput).value.trim();

        Meteor.call('trigger-next-month', username);
    }

    render() {
        return <div className="admin">
            <h1> Admin </h1>
            <label> Username: </label>
            <input type="text" ref="usernameInput" placeholder="Username" />


            <form className="new-task" onSubmit={this.handleSubmitSleepingHours.bind(this)} >
                <label> Sleeping Hours: </label>
                <input type="text" ref="sleepInput" placeholder="Sleeping hours" />
                <button type="submit"> Submit </button>
            </form>

            <form className="new-task" onSubmit={this.handleSubmitJoggingHours.bind(this)} >
                <label> Jogging Time: </label>
                <input type="text" ref="joggingInput" placeholder="Jogging hours" />
                <button type="submit"> Submit </button>
            </form>

            <form className="new-task" onSubmit={this.handleSubmitIntensiveHours.bind(this)} >
                <label> Intensive Cardio Time: </label>
                <input type="text" ref="intensiveInput" placeholder="Intensive hours" />
                <button type="submit"> Submit </button>
            </form>

            <br />
            <button onClick={ this.handleTriggerNextDay.bind(this) }> Trigger Next Day </button>

            <br />
            <button onClick={ this.handleTriggerNextMonth.bind(this) }> Trigger Next Month </button>

            <br />
            <br />

            <a onClick={ this.props.goToHome } href="#">Back</a>
        </div>;
    }
}