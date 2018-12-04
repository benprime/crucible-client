import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
import Log from './components/Log';
import CommandInput from './components/CommandInput';
import Hud from './components/Hud';
import config from './config';

class App extends Component {
  constructor() {
    super();

    this.token = document.cookie;
    let socketUrl = config.crucibleMudSocketUri;
    if(this.token) {
      socketUrl += '?token=' + this.token;
    }
    console.log('cookie', document.cookie);
    console.log('url', socketUrl);

    this.socket = openSocket(socketUrl).on('authentication', data => {
      document.cookie = data.token;
      console.log('token: ' + JSON.stringify(data));
    });

    // this is in-memory only... probably should be in a cookie for browser refresh
    if(this.token) {
      this.socket.emit('authentication', {token: this.token});
    }
  }


  async componentDidMount() {
    this.focusInput();
  }

  focusInput() {
    document.getElementById('textData').focus();
  }

  render() {
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
