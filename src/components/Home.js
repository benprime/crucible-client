import React, { Component } from 'react';
import './Home.css';
import LoginComponent from './LoginComponent';
import SignUpComponent from './SignUpComponent';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      showSignup: false
    };

    this.toggleSignUpForm = this.toggleSignUpForm.bind(this);
  }

  toggleSignUpForm() {
    this.setState({
      showSignup: !this.state.showSignup
    });
  }

  render() {
    return (
    <div id="home" className="home">
    <pre>
      <div><span style={{color:"#b12020"}}>   ▄████████ ▀█████████▄  ███    █▄   ▄████████  ▄█  ▀█████████▄   ▄█      ▀███████████ </span></div>
      <div><span style={{color:"#b72c24"}}>  ███    ███   ███    ███ ███    ███ ███    ███ ███    ███    ███ ███        ███    ███ </span></div>
      <div><span style={{color:"#be3728"}}>  ███    ██▀   ███    ███ ███    ███ ███    █▀  ███▌   ███    ███ ███        ███    █▀  </span></div>
      <div><span style={{color:"#c4432c"}}>  ███    ▀    ▄███▄▄▄██▀  ███    ███ ███        ███▌  ▄███▄▄▄██▀  ███       ▄███▄▄▄     </span></div>
      <div><span style={{color:"#ca4f30"}}>  ███        ▀▀███▀▀▀██▄  ███    ███ ███        ███▌ ▀▀███▀▀▀██▄  ███      ▀▀███▀▀▀     </span></div>
      <div><span style={{color:"#d15a34"}}>  ███          ███    ██▄ ███    ███ ███    █▄  ███    ███    ██▄ ███        ███        </span></div>
      <div><span style={{color:"#d76638"}}>  ███    █▄    ███    ███ ███    ███ ███    ███ ███    ███    ███ ███▌   ▄   ███    █▄  </span></div>
      <div><span style={{color:"#cf5833"}}>  ███    ███   ██▀    ██▀ ████████▀  ████████▀  █▀   ▄█████████▀  ████▄▄██   ███    ███ </span></div>
      <div><span style={{color:"#c84a2e"}}>   ▀██████▀    ▀                                                  ▀        ▄█████████▀  </span></div>
      <div><span style={{color:"#c03c2a"}}>                            ▄▄▄▄███▄▄▄▄   ███    █▄  ████████▄                          </span></div>
      <div><span style={{color:"#b92e25"}}>                          ▄██▀▀▀███▀▀▀██▄ ███    ███ ███   ▀███                         </span></div>
      <div><span style={{color:"#b12020"}}>         █▄               ███   ███   ███ ███    ███ ███    ███               ▄█        </span></div>
      <div><span style={{color:"#b72c24"}}>         ▀██████████▄     ███   ███   ███ ███    ███ ███    ███     ▄██████████▀        </span></div>
      <div><span style={{color:"#be3728"}}>                   ▀█     ███   ███   ███ ███    ███ ███    ███     █▀                  </span></div>
      <div><span style={{color:"#c4432c"}}>                          ███   ███   ███ ███    ███ ███    ███                         </span></div>
      <div><span style={{color:"#ca4f30"}}>                          ███   ███   ███ ███    ███ ███   ▄███                         </span></div>
      <div><span style={{color:"#d15a34"}}>                           ▀█   ███   █▀  ████████▀  ████████▀                          </span></div>
      <div><span style={{color:"#d76638"}}>                                                                   </span></div>
      <div><span style={{color:"#d54725"}}>-</span><span style={{color:"#d85021"}}>-</span><span style={{color:"#da581d"}}>-</span><span style={{color:"#dd6119"}}>=</span><span style={{color:"#df6a15"}}>=</span><span style={{color:"#e27210"}}>=</span><span style={{color:"#e47b0c"}}>-</span><span style={{color:"#e78408"}}>-</span><span style={{color:"#e98c04"}}>-</span><span style={{color:"#ec9500"}}> </span><span style={{color:"#ee9f04"}}>F</span><span style={{color:"#f1aa09"}}>o</span><span style={{color:"#f3b40d"}}>r</span><span style={{color:"#f5bf12"}}>g</span><span style={{color:"#f7c916"}}>e</span><span style={{color:"#fad31a"}}> </span><span style={{color:"#fcde1f"}}>o</span><span style={{color:"#fee823"}}>f</span><span style={{color:"#fcdf1f"}}> </span><span style={{color:"#fad61b"}}>W</span><span style={{color:"#f8cc17"}}>o</span><span style={{color:"#f6c313"}}>r</span><span style={{color:"#f4ba10"}}>l</span><span style={{color:"#f2b10c"}}>d</span><span style={{color:"#f0a708"}}>s</span><span style={{color:"#ee9e04"}}> </span><span style={{color:"#ec9500"}}>-</span><span style={{color:"#e98b05"}}>-</span><span style={{color:"#e68209"}}>-</span><span style={{color:"#e3780e"}}>=</span><span style={{color:"#e16e13"}}>=</span><span style={{color:"#de6417"}}>=</span><span style={{color:"#db5b1c"}}>-</span><span style={{color:"#d85120"}}>-</span><span style={{color:"#d54725"}}>-</span></div>

      <br /><a href="https://github.com/benprime/crucible-mud">[GitHub]</a><br /><br />

      Release news soon!

    </pre>


    <div>
        {this.state.showSignup
          ? <SignUpComponent></SignUpComponent>
          : <LoginComponent></LoginComponent>
        }
      </div>
      <div>
      {this.state.showSignup
          ? <a onClick={this.toggleSignUpForm}>Sign-In With Existing Account</a>
          : <a onClick={this.toggleSignUpForm}>Sign-Up Here</a>
        }
      </div>
    </div>
    );
  }
}

export default Home;
