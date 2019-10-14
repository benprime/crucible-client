import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import GameScreen from './components/GameScreen';
import { loginEvent } from './services/auth-service';

class App extends Component {

  socket = null;
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };

    loginEvent.on('login', (() => {
      this.setState({
        loggedIn: true
      });
    }));
  }

  render() {
    return (
      <div>
        {this.state.loggedIn
          ? <GameScreen></GameScreen>
          : <Home></Home>
        }
      </div>
    );
  }
}

export default App;
