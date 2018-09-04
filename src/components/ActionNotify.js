import React, { Component } from 'react';
import './ActionNotify.css';

export default class ActionNotify extends Component {

    playSound() {
        var audio = new Audio('cardSlide1.wav');
        audio.play();
    }
    
    render() {
        return (
        <div id="actionNotify" className="ActionNotify">
            <img src="ic_warning_white_18dp_1x.png" alt="Warning" />
        </div>
        );
    }
}