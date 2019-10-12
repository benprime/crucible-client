import React, { Component } from 'react';
import './GameScreen.css';
import Log from './Log';
import CommandInput from './CommandInput';
import Hud from './Hud';

class GameScreen extends Component {

  render() {
    return (
      <div id="gamescreen" className="gamescreen">
        <Log />
        <CommandInput />
        <Hud />
      </div>
    );
  }
}

export default GameScreen;
