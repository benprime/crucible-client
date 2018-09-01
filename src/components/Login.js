import React, { Component } from "react";
import "./Login.css";
import { Auth } from "aws-amplify";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await Auth.signIn(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div className="white">Email</div>
                        <input id="email"
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <div className="white">Password</div>
                        <input id="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </div>
                    <button disabled={!this.validateForm()} type="submit">
                        {this.state.isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        );
    }
}