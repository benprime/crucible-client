import React, { Component } from 'react';
import './HealthBar.css';

export default class HealthBar extends Component {
    socket = null;

    constructor(props){
        super(props);

        this.state = {
            currentHP: "-",
            maxHP: "-",
            status: "-",
            dayPhase: "-",
            currency: "-"
        }

        this.socket = props.socket;
    }

    componentDidMount() {
        this.socket.on('hud', data => this.setState(data));
    }

    render() {
        return (
            <div id="healthBar" className="HealthBar">
                <span class="darkcyan">HP: ${this.state.currentHP}/${this.state.maxHP}</span>
                <span class="mediumOrchid">[</span>${this.state.status}<span class="mediumOrchid">]</span>
                <span class="silver">Time: ${this.state.dayPhase}</span>
                <span class="teal">$${this.state.currency}</span>
            </div>
        );
    }
}