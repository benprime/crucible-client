import React, { Component } from 'react';
import './Log.css';
import '../index.css';
import ActionNotify from './ActionNotify';

let socket;
let actionNotify;
let logElement;
let actionNotifySound = new Audio('cardSlide1.wav');

export default class Log extends Component {
    constructor(props){
        super(props);
        socket = this.props.socket;
    }


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        socket.on('output', data => this.handleOutput(data));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleOutput(data) {
        logElement = document.getElementById('log');
        var atBottom = logElement.scrollHeight - logElement.scrollTop < logElement.clientHeight + 30;
        var newHTML;

        if (data.pre) {
            newHTML = data.message;
        } else if (data.message && data.message.length > 0) {
            newHTML = data.message.replace(/\n/g, '<br />\n');
        } else {
            newHTML = ""
        }

        logElement.innerHTML = logElement.innerHTML + newHTML + '<br />';

        if (atBottom) {
            this.scrollLogToBottom();
        } else {
            actionNotify = document.getElementById('actionNotify');
            actionNotify.style.display = 'block';
            actionNotifySound.play();
        }

        /*
        if(data.message.includes('You say "boogie"')) {
          ta.classList.toggle('shake');
          console.log(ta.class);
        }
        */
    }

    handleScroll(event) {
        var element = event.currentTarget;
        var atBottom = element.scrollHeight - element.scrollTop < element.clientHeight + 30;
        if (atBottom) {
            actionNotify = document.getElementById('actionNotify');
            actionNotify.style.display = 'none';
        }
    }

    scrollLogToBottom() {
        logElement = document.getElementById('log');
        logElement.scrollTop = logElement.scrollHeight;
    }

    render() {
        return (
            <div className="log" id="log">
                <ActionNotify />
            </div>
        );
    }
}