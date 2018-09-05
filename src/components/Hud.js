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
                <span class="darkcyan">HP: {this.state.currentHP}/{this.state.maxHP}</span>&nbsp;
                <span class="mediumOrchid">[</span>{this.state.status}<span class="mediumOrchid">]</span>&nbsp;
                <span class="silver">Time: {this.state.dayPhase}</span>&nbsp;
                <span class="teal">${this.state.currency}</span>&nbsp;
                <span class="olive">[{this.state.states.length > 0 ? this.state.states.join(', ') : ' None '}]</span>
            </div>
        );
    }
}