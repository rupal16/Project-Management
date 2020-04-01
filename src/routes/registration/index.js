import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { userDbRef } from "../../config/firebase";
import sendOtp from "../../services/send-otp";

import Input from "../../components/Input";

import "./style.scss";

const initialState={
  otpSent: false,
  initialSubmit: true, 
  firstName: {
    val: "",
    err: ""
  },
  lastName: {
    val: "",
    err: ""
  },
  phone: {
    val: "",
    err: ""
  },
  email: {
    val: "",
    err: ""
  },
  password: {
    val: "",
    err: ""
  },
  confirmPassword: {
    val: "",
    err: ""
  },
  otp: {
    val: "",
    err: ""
  }
}

class Registration extends Component {
  constructor(props) {
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
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword
    } = this.state;

    let formErr = false;

    if (!firstName.val.trim()) {
      firstName.err = "First name cannot be blank!";
      formErr = true;
    }

    if (!lastName.val.trim()) {
      lastName.err = "Last name cannot be blank!";
      formErr = true;
    }

    if (!phone.val.trim()) {
      phone.err = "Phone number cannot be blank!";
      formErr = true;
    }

    if (!email.val.trim()) {
      email.err = "Email cannot be blank!";
      formErr = true;
    } else {
      if (!email.val.trim().includes("@")) {
        email.err = "invalid email";
        formErr = true;
      }
    }

    if (!password.val) {
      password.err = "Password cannot be blank!";
      formErr = true;
    } else {
      if (password.length < 6) {
        password.err = "Password should contain more than 6 characters!";
        formErr = true;
      }
    }

    if (!confirmPassword.val) {
      confirmPassword.err = "Confirm password cannot be blank!";
      formErr = true;
    } else if (confirmPassword.val !== password.val) {
      confirmPassword.err = "Unmatched password";
      formErr = true;
    }

    if (formErr) {
      this.setState({
        firstName,
        lastName,
        phone,
        email,
        password,
        confirmPassword
      });
      return false;
    }
    return true;
  };

  handlesubmit = event => {
    event.preventDefault();
    if(this.state.initialSubmit){
      const isValid = this.validate();

    if (isValid) {
      sendOtp(this.state.phone.val,
      ()=>this.setState({...this.state,otpSent:true, initialSubmit: false}));    
    }
    else{
      this.setState(initialState);
    }

   } else {
      event.preventDefault();
    }
    this.saveUser();
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  saveUser = () => {
    const { firstName, lastName, phone, email, password } = this.state;

    var newUserRef = userDbRef.push();
    
    newUserRef.set({
      firstName,
      lastName,
      phone,
      email,
      password
    });
  };
  

  render() {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      otp,
      otpSent,

    } = this.state;


    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Register Now!</h1>

          <form onSubmit={this.handlesubmit}>
            <div>
              <Input
                labelname="First Name"
                type="text"
                name="firstName"
                placeholder=" First Name"
                handleChange={this.handleChange}
                value={firstName.val}
                err={firstName.err}
              />
            </div>

            <div>
              <Input
                labelname="Last Name"
                type="text"
                name="lastName"
                placeholder=" Last Name"
                handleChange={this.handleChange}
                value={lastName.val}
                err={lastName.err}
              />
            </div>

            <div>
              <Input
                labelname="Phone Number (Include the country code- eg: +91-xxxxxxxxxx)"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="phone"
                placeholder="Phone Number"
                handleChange={this.handleChange}
                value={phone.val}
                required
                err={phone.err}
              />
            </div>

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
              <Input
                labelname="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                handleChange={this.handleChange}
                value={confirmPassword.val}
                err={confirmPassword.err}
              />
            </div>
            {otpSent && <div>
              <Input
                labelname="Enter OTP"
                type="number"
                name="otp"
                placeholder=" Enter OTP"
                handleChange={this.handleChange}
                value={otp.val}
                err={otp.err}
              />
            </div>
            }

             <div id="recaptcha">
              <Button
                variant="secondary"
                type="submit"
                value="submit"
              >
                Submit
              </Button>
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
    );
  }
}
export default Registration;
