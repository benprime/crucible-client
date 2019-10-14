import React, { Component } from 'react';
import './forms.css';
import { signup } from '../services/auth-service';


export default class LoginComponent extends Component {
  socket = null;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      errors: [],
      messages: []
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleUserNameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleConfirmPasswordChange(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  async submitSignup(event) {
    event.preventDefault();

    if(this.state.password !== this.state.confirmPassword) {
      this.setState({
        errors: ["Passwords do not match"]
      });
      return;
    }

    try {
      var result = await signup(this.state.email, this.state.username, this.state.password);
      this.setState({
        errors: [],
        messages: ["User successfully created. Please verify your user via email before logging in."]
      });
    } catch(errors) {
      this.setState({
        errors: errors
      })
    }


    console.log("submit signup", result);
  }

  render() {
    return (
      <div id="userBar" className="userBar">
        {this.state.errors.length > 0 &&
          <div className="form-errors">
            {this.state.errors.map(err => <div key={err}>{err}</div>)}
          </div>
        }
        {this.state.messages.length > 0 &&
          <div className="form-messages">
            {this.state.messages.map(msg => <div key={msg}>{msg}</div>)}
          </div>
        }
        <form onSubmit={this.submitSignup}>
          <div className="form-field">
            <label>Email Address</label>
            <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
          </div>
          <div className="form-field">
            <label>Username</label>
            <input type="text" value={this.state.username} onChange={this.handleUserNameChange} />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </div>
          <div className="form-field">
            <label>Confirm Password</label>
            <input type="password" onChange={this.handleConfirmPasswordChange} />
          </div>
          <div className="form-field">
            <label></label>
            <button>Register</button>
          </div>

        </form>
      </div>
    );
  }
}
