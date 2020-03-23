import React, { Component } from 'react'
import './user-reg.scss' ;
import { Link } from 'react-router-dom' ;
import { Button } from 'react-bootstrap';

const initialState = {
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

}

class regis extends Component {
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
        
        event.preventDefault();
        const isValid = this.validate();
        if (isValid){
            console.log(this.state);
            //clear form
            this.setState(initialState);
        }
        
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
      }




    render() {
        return (
            <div className="wrapper">
            <div className="form-wrapper">
                <h1>Register Now!</h1>
                <form onSubmit={this.handlesubmit}>
                <div className>
                    <label>First Name
                    <input type="text" className="firstName fields" name="firstName" placeholder=" First Name" onChange={this.handleChange} value={this.state.firstName}></input>
                    </label>

                    <div className="input-error">{this.state.firstNameError}</div>
                </div>
                
                <div>
                    <label>Last Name
                    <input type="text" className="lastName fields" name="lastName" placeholder=" Last Name" onChange={this.handleChange} value={this.state.lastName}></input>
                    </label>
                    <div className="input-error">{this.state.lastNameError}</div>
                    
                </div>
                
                <div>
                    <label>E-mail
                    <input type="email" className="email fields" placeholder="E-mail" name="email" onChange={this.handleChange} value={this.state.email}></input>
                    </label>
                    <div className="input-error">{this.state.emailError}</div>
                </div>
                
                <div>
                    <label>Password
                    <input type="password" className="password fields" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password}></input>
                    </label>
                    <div className="input-error">{this.state.passwordError}</div>
                </div>
                
                <div>
                    <label>Confirm Password
                    <input type="password" className="confirmPassword fields" placeholder="confirm password" name="confirmPassword" onChange={this.handleChange} value={this.state.confirmPassword}></input>
                    </label>
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
export default regis
