import React, { Component } from 'react';
import './Hud.css';
import { loginEvent } from '../services/auth-service';

export default class Loogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentHP: "-",
      maxHP: "-",
      status: "-",
      dayPhase: "-",
      currency: "-",
      states: []
    }

    loginEvent.on('login', (socket => {
      socket.on('hud', data => this.setState(data));
    }));
  }

  render() {
    return (
      <div id="hud" className="Hud">
        <span className="darkcyan">HP: {this.state.currentHP}/{this.state.maxHP}</span>&nbsp;
                <span className={this.state.status.style}>[{this.state.status.text}]</span>&nbsp;
                <span className="silver">Time: {this.state.dayPhase}</span>&nbsp;
                <span className="teal">${this.state.currency}</span>&nbsp;
                <span className="olive">[{this.state.states.length > 0 ? this.state.states.join(', ') : ' None '}]</span>
      </div>
    );
  }
}
