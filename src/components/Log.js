import React, { Component } from 'react';
import './Log.css';
import ActionNotify from './ActionNotify';

export default class Log extends Component {
    socket = null;

    constructor(props) {
        super(props);

        this.socket = props.socket;
    }

    componentDidMount() {
        window.addEventListener('scroll', e => this.handleScroll(e));
        this.socket.on('output', data => this.handleOutput(data));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleOutput(data) {
        let logElement = document.getElementById('log');
        let atBottom = logElement.scrollHeight - logElement.scrollTop < logElement.clientHeight + 30;
        let newHTML;

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
            let actionNotify = document.getElementById('actionNotify');
            actionNotify.style.display = 'block';

            let actionNotifySound = new Audio("cardSlide1.wav");
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
            let actionNotify = document.getElementById('actionNotify');
            actionNotify.style.display = 'none';
        }
    }

    scrollLogToBottom() {
        let logElement = document.getElementById('log');
        logElement.scrollTop = logElement.scrollHeight;
    }

    render() {
        return (
            <div className="Log" id="log">
                <ActionNotify onClick={this.scrollLogToBottom} />
            </div>
        );
    }
}