import React, { Component } from 'react';

import { composeWithTracker } from 'react-komposer';

import { Main } from './Main.jsx';

import '../client/startup.js';

var app = null;

export const getApp = () => {
    return app;
}


export class App extends Component {
    componentWillMount(){
        app = this;

        this.setState({});
    }
    componentDidMount(){
        this.setState({isAppMounted: true});
    }
    shouldComponentUpdate(nextProps, nextState){
        return this.state.isAppMounted == true ? false : true;
    }
    render() {
        console.log("app mounted");
        return ( this.state.isAppMounted == true ?
            <div className="app">
                <Main />
            </div>
        :
            <div className="not-mounted">
            </div>
        );
    }
}