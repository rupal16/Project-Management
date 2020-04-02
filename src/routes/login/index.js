import React, { Component } from 'react' ;
import { Link } from 'react-router-dom' ;
import { Button } from 'react-bootstrap';

import { userDbRef } from "../../config/firebase";

import Input from '../../components/input' ; 

import './style.scss' ;

// var messageRef = firebase.database().ref('messages');

const initialState = {
    initialSubmit: true,
    email:{
        val:"",
        err:""
    },
    password: {
        val: "",
        err: ""
    }
}

class Login extends Component {
    constructor(props){
        super(props);
        this.state = initialState;
    }

    handleChange = event => {
        const { target } = event;
        const { value, name } = target;
        const fieldObj = this.state[name];
        fieldObj.val = value;
        this.setState({
          [name]: fieldObj
        });
      };
    
    validate = () => {
        const {
            email,
            password
        } = this.state;

        let formErr = false;
 

        if(!email.val.trim()){
            email.err= "Email cannot be blank!";
            formErr = true;
        } else{
        if(!email.val.trim().includes('@')){
            email.err = "invalid email";
            formErr = true;
        }
    }
        if(!password.val){
            password.err = "Password cannot be blank!";
            formErr = true;
        }else{
            if(password.val.length<6){
                password.err = "Incorrect Password!";
                formErr = true;
            }
        }       

        if(formErr){
            this.setState({
                email,
                password
            });
            return false;
        
        }
        return true;
    };

    handlesubmit = (event) => {     
        event.preventDefault();
        if(this.state.initialSubmit) {
            const isValid = this.validate();
            if(isValid){
                this.setState(initialState);
            }else{
                event.preventDefault();
            }
            this.saveUser();
        }
    }

    saveUser = () => {
        const { email, password } = this.state;
    
        var newUserRef = userDbRef.push();
        
        newUserRef.set({
          email,
          password
        });
      };

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
      }

    render() {
        const {
            email,
            password
        } = this.state;

        return (
            <div className="wrapper">
                <div className="form-wrapper">
                <form onSubmit={this.handlesubmit}>
                    <h1>Sign in now!</h1>
                    <div>
              <Input
                labelname="Email"
                type="email"
                name="email"
                placeholder=" Email"
                handleChange={this.handleChange}
                value={email.val}
                err={email.err}
              />
            </div>
            <div>
              <Input     
                labelname="Password"
                type="password"
                name="password"
                placeholder=" Password"
                handleChange={this.handleChange}
                value={password.val}
                err={password.err}
              />
            </div>

                <div>
                    <input 
                    type="checkbox" 
                    className="remember" 
                    placeholder="remember"
                    ></input>
                    
                        <label>Remember Me
                        </label>
                        <p className="forgotpass">
                         <Link to="/">Forgot Password</Link>
                        </p>
                    </div>
                    <div>
                        <Button 
                        variant="secondary" 
                        className="fields button" 
                        value="submit" 
                        type="submit">Sign In</Button>
                    </div>
                    <div>
                        <p className="login">
                        Do not have an account yet?<Link to="/user-registration">sign up</Link>
                        </p>
                    
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
