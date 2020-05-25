import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Spinner, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import sendOtp from '../../services/send-otp';
import { saveUser, isPhoneRegistered } from '../../services/user-service';

import Input from '../../components/Input';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

const buttonStyle = {
  backgroundColor: '#008B8B',
  width: '390px',
  padding: '10px',
  marginTop: '15px',
  marginLeft: '15px',
};

class Registration extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      formError: false,
      someError: false,
      unmatchedPassword: false,
      errorMsg: false,
      errorMessageDisplay: false,
      isUserRegistered: false,
      isloading: false,
      otpSent: false,
      initialSubmit: true,
      firstName: {
        val: '',
        err: '',
      },
      lastName: {
        val: '',
        err: '',
      },
      phone: {
        val: '',
        err: '',
      },
      email: {
        val: '',
        err: '',
      },
      password: {
        val: '',
        err: '',
      },
      confirmPassword: {
        val: '',
        err: '',
      },
      otp: {
        val: '',
        err: '',
      },
    };
  }

  fetchData = () => {
    this.setState({
      isloading: true,
    });
    setTimeout(() => {
      this.setState({
        isloading: false,
      });
    }, 2000);
  };

  handleChange = event => {
    const { target } = event;
    const { value, name } = target;
    const fieldObj = this.state[name];
    fieldObj.val = value;
    this.setState({
      [name]: fieldObj,
    });
  };

  validate = () => {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
    } = this.state;
    let formErr = false;
    if (!firstName.val.trim()) {
      firstName.err = 'First name cannot be blank!';
      formErr = true;
    }

    if (!lastName.val.trim()) {
      lastName.err = 'Last name cannot be blank!';
      formErr = true;
    }

    if (!phone.val.trim()) {
      phone.err = 'Phone number cannot be blank!';
      formErr = true;
    } else if (phone.val.length !== 14) {
      phone.err = 'Invalid number. Check the format';
      formErr = true;
    }

    if (!email.val.trim()) {
      email.err = 'Email cannot be blank!';
      formErr = true;
    } else if (!email.val.trim().includes('@')) {
      email.err = 'invalid email';
      formErr = true;
    }

    if (!password.val) {
      password.err = 'Password cannot be blank!';
      formErr = true;
    } else if (password.length < 6) {
      password.err = 'Password should contain more than 6 characters!';
      formErr = true;
    }

    if (formErr) {
      this.setState({
        formError: true,
        firstName,
        lastName,
        phone,
        email,
        password,
        confirmPassword,
      });
      return false;
    }
    return true;
  };

  checkUser = async phone => {
    const isValid = this.validate();
    if (isValid) {
      try {
        let isRegistered = await isPhoneRegistered(phone);
        console.log(isRegistered);
        if (isRegistered) {
          this.setState({
            isUserRegistered: true,
          });
        } else {
          this.handleOtp(phone);
        }
      } catch (err) {
        this.setState({
          someError: true,
        });
      }
    }
  };

  handlesubmit = async event => {
    const { phone, initialSubmit, otp, formError } = this.state;
    event.preventDefault();
    this.fetchData();
    if (initialSubmit) {
      const isValid = this.validate();
      if (isValid && formError) {
        this.disableInputField();
      }

      this.checkUser(phone);
    } else {
      const isValid = this.validate();
      if (isValid && formError) {
        event.preventDefault();
        const { firstName, lastName, phone, email } = this.state;
        const confirmationResult = window.confirmationResult;
        const userEnteredOtp = otp.val;
        try {
          await confirmationResult.confirm(userEnteredOtp);
          await saveUser(firstName.val, lastName.val, phone.val, email.val);
          this.props.history.push('./dashboard');
        } catch (err) {
          this.setState({ errorMessageDisplay: true });
        }
      }
    }
  };

  handleOtp = phone => {
    sendOtp(
      phone.val,
      () =>
        this.setState({
          ...this.state,
          otpSent: true,
          initialSubmit: false,
        }),
      () => {
        this.setState({ someError: true });
      },
    );
  };

  handleBlur = e => {
    const pass = e.target.value;
    const { password, confirmPassword } = this.state;
    if (password.val === pass) {
      confirmPassword.err = null;
      this.setState({
        formError: true,
      });
    } else {
      confirmPassword.err = 'Unmatched password';
      this.setState({
        formError: false,
      });
    }
    this.setState({
      confirmPassword,
    });
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  disableInputField = function() {
    var nameList = [
      'firstName',
      'lastName',
      'phone',
      'email',
      'password',
      'confirmPassword',
    ];
    var inputDomElements = document.getElementsByTagName('input');
    nameList.forEach(inputName => {
      var inputElement = inputDomElements[inputName];
      if (inputElement !== undefined) {
        inputElement.disabled = true;
      }
    });
  };

  onKeyPress = event => {
    if (event.which === 13) {
      event.preventDefault();
    }
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
        <Form onKeyPress={this.onKeyPress} onSubmit={this.handlesubmit}>
          <div className="form-wrapper">
            <h1>Register Now!</h1>
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
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                handleChange={this.checkPassword}
                value={confirmPassword.val}
                err={confirmPassword.err}
              />
            </div>

            {otpSent && (
              <div>
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
            )}
            {this.errorMsg ? <h2>Incorrect Otp</h2> : null}
            <div id="recaptcha">
              <Button
                type="submit"
                variant="secondary"
                value="submit"
                style={buttonStyle}
                disabled={this.isloading}
              >
                {this.state.isloading && (
                  <div id="actionInProgressSpinner">
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span style={{ 'left-margin': '30px' }}>
                      Please wait...
                    </span>
                  </div>
                )}
                {!this.state.isloading && (
                  <div>
                    <span>Submit</span>
                  </div>
                )}
              </Button>
            </div>
            <br />
            <div>
              <p className="forgot-password">
                Already registered? <Link to="/signin">sign in</Link>
              </p>
            </div>
            {!otpSent && <div id="recaptcha-container" />}
          </div>
        </Form>
        <Modal show={this.state.errorMessageDisplay} size="lg" centered>
          <Modal.Body>
            <p>Invalid OTP </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.setState({ errorMessageDisplay: false })}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.isUserRegistered} size="lg" centered>
          <Modal.Body>
            <p>You are already registered!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ isUserRegistered: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.someError} size="lg" centered>
          <Modal.Body>
            <p>Your request could not be processed. Please try again later</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ someError: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default withRouter(Registration);
