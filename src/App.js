import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
import { Auth } from "aws-amplify";
import Login from "./components/Login";
import Log from "./components/Log";
import CommandInput from "./components/CommandInput";

const socket = openSocket('http://localhost:3000');

class App extends Component {
  constructor(props) {
    super(props);

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

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
    socket.on('hud', data => this.handleHud(data));
    this.focusInput();
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  handleHud(data) {
    var healthBar = document.getElementById('healthBar');
    var hpText = `<span class="darkcyan">HP: ${data.currentHP}/${data.maxHP}</span>&nbsp;`;
    hpText += `<span class="mediumOrchid">[</span>${data.status}<span class="mediumOrchid">]</span>&nbsp;`;
    hpText += `<span class="silver">Time: ${data.dayPhase}</span>&nbsp`;
    hpText += `<span class="teal">$${data.currency}</span>&nbsp`;
    healthBar.innerHTML = hpText;
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

    document.getElementById("textData").focus();
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
      <div id="flexbox" onClick={this.focusInput}>
        <Log socket={socket} />
        <CommandInput socket={socket} />
        <div id="healthBar"></div>
      </div>
    );
  }
}

export default App;
