import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
import Log from './components/Log';
import CommandInput from './components/CommandInput';
import Hud from './components/Hud';
import config from './config';

class App extends Component {
  socket = openSocket(config.crucibleMudSocketUri);;

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
