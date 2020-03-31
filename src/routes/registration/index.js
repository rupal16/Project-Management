import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { userDbRef } from "../../config/firebase";
import sendOtp from "../../services/send-otp";

import Input from "../../components/Input";

import "./style.scss";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      confirmPasswordError: ""
    };
  }

  handleChange = event => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value
    });
  };

  validate = () => {
    let firstNameError = "";
    let lastNameError = "";
    let phoneError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword
    } = this.state;

    if (!firstName.trim()) {
      firstNameError = "First name cannot be blank!";
    }

    if (!lastName.trim()) {
      lastNameError = "Last name cannot be blank!";
    }

    if (!phone.trim()) {
      phoneError = "Phone number cannot be blank!";
    }

    if (!email.trim()) {
      emailError = "Email cannot be blank!";
    } else {
      if (!email.trim().includes("@")) {
        emailError = "invalid email";
      }
    }

    if (!password) {
      passwordError = "Password cannot be blank!";
    } else {
      if (password.length < 6) {
        passwordError = "Password should contain more than 6 characters!";
      }
    }

    if (!confirmPassword) {
      confirmPasswordError = "Confirm password cannot be blank!";
    } else if (confirmPassword !== password) {
      confirmPasswordError = "Unmatched password";
    }

    if (
      firstNameError ||
      lastNameError ||
      phoneError ||
      emailError ||
      passwordError ||
      confirmPasswordError
    ) {
      this.setState({
        firstNameError,
        lastNameError,
        phoneError,
        emailError,
        passwordError,
        confirmPasswordError
      });
      return false;
    }
    return true;
  };

  handlesubmit = event => {
    const isValid = this.validate();

    if (isValid) {
      this.setState({
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
        confirmPasswordError: ""
      });
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

  handleClick = phone => {
    sendOtp("+91 8961991275");
  };

  render() {
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
                value={this.state.firstName}
              />
              <div className="input-error">{this.state.firstNameError}</div>
            </div>

            <div>
              <Input
                labelname="Last Name"
                type="text"
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
                name="confirmPassword"
                placeholder="Confirm Password"
                handleChange={this.handleChange}
                value={this.state.confirmPassword}
              />
              <div className="input-error">
                {this.state.confirmPasswordError}
              </div>
            </div>

            <div id="recaptcha">
              <Button
                variant="secondary"
                type="submit"
                value="submit"
                onClick={this.handleClick}
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
