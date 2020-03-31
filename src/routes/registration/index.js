import React, { Component } from 'react'
import './registration.scss' ;
import { Link } from 'react-router-dom' ;
import { Button } from 'react-bootstrap';
import firebase from '../../config/Fire' ;
import initialState from '../../components/initialState' ;
import Input from '../../components/input' ; 
import sendOtp from '../../utils/auth' ;


let messageRef = firebase.database().ref('messages');

class Registration extends Component {
    constructor(props){
        super(props);
        this.state=({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            firstNameError: "",
            lastNameError: "",
            phoneError: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError: "",
        });
    }
   handleChange = (event) => {
        const isCheckbox = event.target.type === "checkbox";
        
            this.setState({
                [event.target.name]: isCheckbox
                ?event.target.checked
                :event.target.value
            });        
    };

    validate = () => {
        let firstNameError= "";
        let lastNameError= "";
        let phoneError= "";
        let emailError= "";
        let passwordError= "";
        let confirmPasswordError= "";

        if(!this.state.firstName.trim()) {
            firstNameError= "First name cannot be blank!";
        }

        if(!this.state.lastName.trim()) {
            lastNameError= "Last name cannot be blank!";
        }
        if(!this.state.phone.trim()) {
            phoneError= "Phone number cannot be blank!";
        }

        if(!this.state.email.trim()){
            emailError= "Email cannot be blank!";
        } else{
        if(!this.state.email.trim().includes('@')){
            emailError = "invalid email";
        }
    }

        if(!this.state.password){
            passwordError = "Password cannot be blank!";
        }else{
            if(this.state.password.length<6){
                passwordError = "Password should contain more than 6 characters!";
            }
        }
        
        if((this.state.confirmPassword !== this.state.password)) {
            confirmPasswordError = "Unmatched password"
        }
        if(!this.state.confirmPassword) {
            confirmPasswordError = "Confirm password cannot be blank!"
        }
        if(firstNameError||lastNameError||phoneError||emailError||passwordError||confirmPasswordError){
            this.setState({firstNameError, lastNameError,phoneError, emailError, passwordError, confirmPasswordError});
            return false;
        }
        return true;

    };
    

    handlesubmit = (event) => {
        const isValid = this.validate();
        if (isValid){
            console.log(this.state);
        
            this.setState(initialState);
        }else{
            event.preventDefault();
        }
        this.saveMessage(this.state.firstName, this.state.lastName,this.state.phone, this.state.email, this.state.password, this.state.confirmPassword);
        
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
      }

      saveMessage = (firstName, lastName, phone, email, password, confirmPassword) => {
        var newMessageRef = messageRef.push();
        newMessageRef.set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,

        });
    }
handleClick = phone => {sendOtp(
    "+91 8961991275"
    )};

    render() {
        return (
            <div className="wrapper">
            <div className="form-wrapper">
                <h1>Register Now!</h1>
                
                <form onSubmit={this.handlesubmit}>
                {console.log(this.state)}
                
                <div>
                <Input
                    labelname="First Name"
                    type="text"
                     className="firstName fields" 
                     name="firstName" 
                     placeholder=" First Name"  
                     handleChange={this.handleChange}
                     value={this.state.firstName}
                    />
                    <div className="input-error">{this.state.firstNameError}</div>
                </div>

               
                <div>
                <Input
                    labelname="Last Name"
                    type="text"
                     className="lastName fields" 
                     name="lastName" 
                     placeholder=" Last Name" 
                     handleChange={this.handleChange} 
                     value={this.state.lastName}
                    />
                    <div className="input-error">{this.state.lastNameError}</div>
                </div>
                <div>
                <Input
                    labelname="Phone Number"
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    className="phone fields" 
                     name="phone" 
                     placeholder="Phone Number" 
                     handleChange={this.handleChange} 
                     value={this.state.phone}
                     required
                    />
                    <div className="input-error">{this.state.phoneError}</div>
                </div>
                <div>
                <Input
                    labelname="Email"
                    type="email"
                     className="email fields" 
                     name="email" 
                     placeholder=" Email"  
                     handleChange={this.handleChange}
                     value={this.state.email}
                    />
                    <div className="input-error">{this.state.emailError}</div>
                </div>
                <div>
                <Input
                    labelname="Password"
                    type="password"
                     className="password fields" 
                     name="password" 
                     placeholder=" Password"  
                     handleChange={this.handleChange}
                     value={this.state.password}
                    />
                    <div className="input-error">{this.state.passwordError}</div>
                </div>
                <div>
                <Input
                    labelname="Confirm Password"
                    type="password"
                     className="confirmPassword fields" 
                     name="confirmPassword" 
                     placeholder="Confirm Password"  
                     handleChange={this.handleChange}
                     value={this.state.confirmPassword}
                    />
                    <div className="input-error">{this.state.confirmPasswordError}</div>
                </div>
                
                <div>
                    <Button variant="secondary" type="submit" value="submit" onClick={this.handleClick}>Submit</Button>{' '}
                </div>
                <br />
                
                <div>
                <p className="forgot-password">
                    Already registered? <Link to="/signin">sign in</Link>
                </p>
                </div>
                <div id="recaptcha-container"></div>                    
                </form>
                </div>
                
            </div>
            )
    
}
}
export default Registration


