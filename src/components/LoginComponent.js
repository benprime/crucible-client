import React, { Component } from 'react';
import './forms.css';
import { login } from '../services/auth-service';


export default class LoginComponent extends Component {
  socket = null;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: []
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
    event.preventDefault();
    try {
      await login(this.state.username, this.state.password);
      this.errors = [];
    } catch (errors) {
      this.setState({
        errors: errors
      });
    }
  }

  render() {
    return (
      <div id="userBar" className="userBar">
        {this.state.errors.length > 0 &&
          <div className="form-errors">
            {this.state.errors.map(err => <div key={err}>{err}</div>)}
          </div>
        }
        <div className="form-field">
          <label>Email Address</label>
          <input type="text" value={this.state.username} onChange={this.handleUserNameChange} />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </div>
        <div className="form-field">
          <label></label>
          <button onClick={this.submitLogin}>Login</button>
        </div>
      </div>
    );
  }
}
