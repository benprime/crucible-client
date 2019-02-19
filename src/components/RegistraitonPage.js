import React from 'react';
import './RegistraitonPage.css'

export default class RegistraitonPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }
    
    handleSubmit(event) {
        console.log('A name was submitted: ', this.state.name);
        event.preventDefault();
    }
    render() {
        return (
            <div id="registration" className="RegistrationPage">
                <form>
                    <label>
                        Name
                    </label>
                    <input
                        name="name" 
                        type="text" 
                        value={this.state.name} 
                        onChange={this.handleChange} />
                    <br />
                    <label>
                        Email
                    </label>
                    <input
                        name="email"
                        type="text"
                        value={this.state.email} 
                        onChange={this.handleChange} />
                    <br />
                    <label>
                        Password
                    </label>
                    <input
                        name="password"
                        type="text"
                        value={this.state.password}
                        onChange={this.handleChange} />
                    <br />
                    <input type="submit" value="Register" />
                </form>
            </div> 
        );
    }
}
