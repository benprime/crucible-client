import React, { Component } from 'react';
import './Hud.css';

export default class Hud extends Component {
    socket = null;

    constructor(props){
        super(props);

        this.state = {
            currentHP: "-",
            maxHP: "-",
            status: "-",
            dayPhase: "-",
            currency: "-",
            states: []
        }

        this.socket = props.socket;
    }

    componentDidMount() {
        this.socket.on('hud', data => this.setState(data));
    }

    render() {
        return (
            <div id="hud" className="Hud">
                <span className="darkcyan">HP: {this.state.currentHP}/{this.state.maxHP}</span>&nbsp;
                <span className="mediumOrchid">[</span>{this.state.status}<span className="mediumOrchid">]</span>&nbsp;
                <span className="silver">Time: {this.state.dayPhase}</span>&nbsp;
                <span className="teal">${this.state.currency}</span>&nbsp;
                <span className="olive">[{this.state.states.length > 0 ? this.state.states.join(', ') : ' None '}]</span>
            </div>
        );
    }
}