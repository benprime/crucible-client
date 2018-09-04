import React, { Component } from 'react';
import './CommandInput.css';

export default class CommandInput extends Component {
    socket = null;
    commandHistory = [];
    historyIndex = -1;

    constructor(props) {
        super(props);

        this.socket = props.socket;
        this.sendData = this.sendData.bind(this);
    }

    sendData(e) {
        if (!e) e = window.event;
        var tb = document.getElementById("textData");
        var keyCode = e.keyCode || e.which || e.charCode;

        // esc
        if (keyCode === 27) {
            tb.value = '';
            this.historyIndex = -1;
        }

        // up arrow
        if (keyCode === 38) {
            this.historyIndex++;
            if (this.historyIndex > this.commandHistory.length - 1) this.historyIndex = this.commandHistory.length - 1;
            tb.value = this.commandHistory[this.historyIndex];
            return false;
        }

        // down arrow
        if (keyCode === 40) {

            // if you push the down arrow when history index is already 0, just blank the field and return.
            this.historyIndex--;
            if (this.historyIndex > -1) {
                tb.value = this.commandHistory[this.historyIndex];
            } else {
                tb.value = '';
            }
            if (this.historyIndex < -1) this.historyIndex = -1;
            return false;
        }

        // enter press
        if (keyCode === 13) {
            var input = tb.value.trim();
            this.socket.emit('command', {
                value: input
            });
            // only save command if it wasn't blank
            if (tb.value && input !== '') {
                // only save command if it doesn't match the last one
                if (this.commandHistory.length === 0 || this.commandHistory[0] !== input) {
                    this.commandHistory.unshift(input); // save command
                    this.commandHistory.splice(25); // only save 25 commands
                    this.historyIndex = -1;
                }
            }
            tb.value = '';
            return false;
        }
    }

    render() {
        return (
            <div id="inputArea" className="CommandInput">
                <input id="textData" onKeyDown={this.sendData} type="text" tabIndex="0" />
            </div>
        );
    }
}