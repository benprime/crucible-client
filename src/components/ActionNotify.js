import React, { Component } from 'react';
import './ActionNotify.css';

export default class ActionNotify extends Component {

    render() {
        return (
        <div id="actionNotify" className="ActionNotify" ref="ActionNotify">
            <img src="ic_warning_white_18dp_1x.png" alt="Warning" />
        </div>
        );
    }
}