import React, { Component } from 'react';
import './Log.css';
import ActionNotify from './ActionNotify';

export default class Log extends Component {
    socket = null;
    messagesEnd = null;

    constructor(props) {
        super(props);

        this.socket = props.socket;
        this.scrollLogToBottom = this.scrollLogToBottom.bind(this);
        this.handleOutput = this.handleOutput.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.atBottom = this.atBottom.bind(this);

        this.state = {
            messages: [],
            actionNotify: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', e => this.handleScroll(e));
        this.socket.on('output', data => this.handleOutput(data));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
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

        let actionNotify = false;
        if (this.atBottom()) {
            this.scrollLogToBottom();
        } else {
            actionNotify = true;
        }

        this.setState(previousState => ({
            messages: [...previousState.messages, newHTML],
            actionNotify: actionNotify
        }));

        /*
        logElement.innerHTML = logElement.innerHTML + newHTML;

        if(data.message.includes('You say "boogie"')) {
          ta.classList.toggle('shake');
          console.log(ta.class);
        }
        */
    }

    handleScroll(event) {
        if (this.atBottom()) {
            this.setState(previousState => ({
                messages: previousState.messages,
                actionNotify: false
            }));
        }
    }

    scrollLogToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    atBottom(offset = 0) {
        let element = this.refs.Log;
        if (!element) return false;
        const top = element.getBoundingClientRect().top;
        return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
    }

    render() {
        return (
            <div id="log" ref="Log" className="Log">
                {this.state.messages.map(message => (<div dangerouslySetInnerHTML={{ __html: message}} />))}
                {this.state.actionNotify ? <ActionNotify onClick={this.scrollLogToBottom()} /> : null}
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
                <br />
            </div>
        );
    }
}