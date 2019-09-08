import React, { Component } from 'react';
import './App.css';
import Log from './components/Log';
import CommandInput from './components/CommandInput';
import Hud from './components/Hud';
import UserBar from './components/UserBar';

class App extends Component {

  async componentDidMount() {
    this.focusInput();
  }

  focusInput() {
    document.getElementById('textData').focus();
  }

  render() {
    return (
      <div id="app" className="App">
        <UserBar />
        <Log />
        <CommandInput />
        <Hud />
      </div>
    );
  }
}

export default App;
