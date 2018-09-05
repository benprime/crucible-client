import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
import { Auth } from 'aws-amplify';
import Login from './components/Login';
import Log from './components/Log';
import CommandInput from './components/CommandInput';
import Hud from './components/Hud';
import config from "./config";

class App extends Component {
  socket = openSocket(config.crucibleMudSocketUri);;

  constructor(props) {
    super(props);

    this.focusInput = this.focusInput.bind(this);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
      }
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    this.focusInput();
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
    this.focusInput();
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
  }

  focusInput() {
    let logElement = document.getElementById('log');
    logElement.addEventListener('scroll', function (event) {
      var element = event.currentTarget;
      var atBottom = element.scrollHeight - element.scrollTop < element.clientHeight + 30;
      if (atBottom) {
        let actionNotify = document.getElementById('actionNotify');
        actionNotify.style.display = 'none';
      }
    });

    document.getElementById('textData').focus();
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
/*
    var display = <div id="flexbox"><Login props={childProps} /></div>;

    if (!this.state.isAuthenticating && this.state.isAuthenticated) {
      display = 
    }
*/
    return (
      <div id="app" className="App" onClick={this.focusInput}>
        <Log socket={this.socket} />
        <CommandInput socket={this.socket} />
        <Hud socket={this.socket} />
      </div>
    );
  }
}

export default App;
