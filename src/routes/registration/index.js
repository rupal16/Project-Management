import React, { Component } from 'react'
import './registration.scss' ;
import { Link } from 'react-router-dom' ;
import { Button } from 'react-bootstrap';
import firebase from '../../config/Fire' ;
import initialState from '../../components/initialState' ;
import Input from '../../components/input' ; 

var messageRef = firebase.database().ref('messages');

class Registration extends Component {
    state = initialState;
    constructor(props){
        super(props);
        this.state=({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError: "",
        });
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
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
        let emailError= "";
        let passwordError= "";
        let confirmPasswordError= "";

        if(!this.state.firstName.trim()) {
            firstNameError= "First name cannot be blank!";
        }

        if(!this.state.lastName.trim()) {
            lastNameError= "Last name cannot be blank!";
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
        if(firstNameError||lastNameError||emailError||passwordError||confirmPasswordError){
            this.setState({firstNameError, lastNameError, emailError, passwordError, confirmPasswordError});
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
        this.saveMessage(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.confirmPassword);
        
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
      }

      saveMessage = (firstName, lastName, email, password, confirmPassword) => {
        var newMessageRef = messageRef.push();
        newMessageRef.set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,

        });
    }

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
                    <Button variant="secondary" type="submit" value="submit">Submit</Button>{' '}
                </div>
                <br />
                
                <div>
                <p className="forgot-password">
                    Already registered? <Link to="/signin">sign in</Link>
                </p>
                </div>                    
                </form>
                </div>
                
            </div>
            )
    }
}
export default Registration


