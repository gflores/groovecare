import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Admin extends Component {

    handleSubmitSleepingHours(event) {
        event.preventDefault();

        const value = ReactDOM.findDOMNode(this.refs.sleepInput).value.trim();
        const username = ReactDOM.findDOMNode(this.refs.usernameInput).value.trim();

        Meteor.call('add-sleeping-hours', username, value);

        console.log("VAL: ", username, value);

        ReactDOM.findDOMNode(this.refs.sleepInput).value = '';
    }

    handleSubmitJoggingHours(event) {
        event.preventDefault();

        const value = ReactDOM.findDOMNode(this.refs.joggingInput).value.trim();
        const username = ReactDOM.findDOMNode(this.refs.usernameInput).value.trim();

        Meteor.call('add-jogging-hours', username, value);

        console.log("VAL: ", username, value);

        ReactDOM.findDOMNode(this.refs.joggingInput).value = '';
    }

    handleSubmitIntensiveHours(event) {
        event.preventDefault();

        const value = ReactDOM.findDOMNode(this.refs.intensiveInput).value.trim();
        const username = ReactDOM.findDOMNode(this.refs.usernameInput).value.trim();

        Meteor.call('add-intensive-hours', username, value);

        console.log("VAL: ", username, value);

        ReactDOM.findDOMNode(this.refs.intensiveInput).value = '';
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

            <a onClick={ this.props.goToHome } href="#">Back</a>
        </div>;
    }
}