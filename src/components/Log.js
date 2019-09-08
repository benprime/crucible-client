import React, { Component } from 'react';
import './Log.css';
import { loginEvent } from '../services/auth-service';

export default class Log extends Component {
    messagesEnd = null;

    constructor(props) {
        super(props);

        this.scrollLogToBottom = this.scrollLogToBottom.bind(this);
        this.handleOutput = this.handleOutput.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.atBottom = this.atBottom.bind(this);

        this.state = {
            messages: [],
            actionNotify: false
        }

        loginEvent.on('login', (socket => {
          console.log('hooking up log', socket);
          socket.on('output', this.handleOutput);
        }));
    }

    handleOutput(data) {
        let newHTML;
        if (data.pre) {
            newHTML = data.message;
        } else if (data.message && data.message.length > 0) {
            newHTML = data.message.replace(/\n/g, '<br />\n');
        } else {
            newHTML = ""
        }

        let atBottom = this.atBottom();

        this.setState(previousState => ({
            messages: [...previousState.messages, newHTML],
            actionNotify: !atBottom
        }));

        if (atBottom) {
            this.scrollLogToBottom();
        }

        /*
        logElement.innerHTML = logElement.innerHTML + newHTML;

        if(data.message.includes('You say "boogie"')) {
          ta.classList.toggle('shake');
          console.log(ta.class);
        }
        */
    }

    handleScroll(event) {
        event.preventDefault();

        if (this.state.actionNotify && this.atBottom()) {
            this.setState(previousState => ({
                messages: previousState.messages,
                actionNotify: false
            }));
        }
    }

    scrollLogToBottom() {
        this.messagesEnd.scrollIntoView(true);
    }

    atBottom(offset = 0) {
        if (!this.messagesEnd) return false;
        const top = this.messagesEnd.getBoundingClientRect().top;
        return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
    }

    render() {
        return (
            <div id="log" ref="Log" className="Log" onScroll={this.handleScroll}>
                {this.state.messages.map((message, index) => (<div key={index} dangerouslySetInnerHTML={{ __html: message }} />))}
                {this.state.actionNotify ?
                    (<div id="actionNotify" className="ActionNotify" ref="ActionNotify" onClick={this.scrollLogToBottom}>
                        <img src="ic_warning_white_18dp_1x.png" alt="Warning" />
                    </div>)
                    : null}
                <div style={{ float: "left", clear: "both", marginBottom: "10px" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        );
    }
}