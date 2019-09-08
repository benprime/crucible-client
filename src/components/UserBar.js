import React, { Component } from 'react';
import './UserBar.css';
import { login } from '../services/auth-service';


export default class UserBar extends Component {
  socket = null;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async submitLogin(event) {
    var result = await login(this.state.username, this.state.password);
    console.log("submitLogin", result);
  }

  render() {
    return (
      <div id="userBar" className="userBar">
        <input type="text" value={this.state.username} onChange={this.handleUserNameChange} />
        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        <button onClick={this.submitLogin}>Login</button>
      </div>
    );
  }
}
