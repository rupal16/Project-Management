import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Spinner, Form } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { isPhoneRegistered, saveUser } from '../../services/user-service';
import sendOtp from '../../services/send-otp';

import Input from '../../components/Input';

import './style.scss';

const buttonStyle = {
  backgroundColor: '#008B8B',
  width: '390px',
  padding: '10px',
  marginTop: '15px',
  marginLeft: '15px',
};

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otpSent: false,
      initialSubmit: true,
      isloading: false,
      errorMessageDisplay: false,
      isUserRegistered: false,
      errorMsg: false,
      formError: false,
      phone: {
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
    const { phone } = this.state;
    let formErr = false;

    if (!phone.val.trim()) {
      phone.err = 'Phone number cannot be blank!';
      formErr = true;
    } else if (phone.val.length !== 14) {
      phone.err = 'Invalid number. Check the format';
      formErr = true;
    }

    if (formErr) {
      this.setState({
        formError: true,
        phone,
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
        console.log('isRegistered', isRegistered);
        if (isRegistered) {
          this.handleOtp(phone);
          this.setState({
            //isUserRegistered: true,
          });
        } else {
          console.log('You do not have an existing account.');
        }
      } catch (err) {
        this.setState({
          someError: true,
        });
      }
    }
  };

  handleSubmit = async event => {
    console.log('from handlesubmit');
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
        const { phone } = this.state;
        const confirmationResult = window.confirmationResult;
        const userEnteredOtp = otp.val;
        try {
          await confirmationResult.confirm(userEnteredOtp);
          await saveUser(phone);
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

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  disableInputField = function() {
    var nameList = ['phone'];
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
    const { phone, otp, otpSent } = this.state;
    return (
      <div className="container">
        <Form onKeyPress={this.onKeyPress} onSubmit={this.handlesubmit} />
        <div className="form-wrapper">
          <h1>Sign-In</h1>
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
              onClick={this.handleSubmit}
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
                  <span style={{ 'left-margin': '30px' }}>Please wait...</span>
                </div>
              )}
              {!this.state.isloading && (
                <div>
                  <span>Submit</span>
                </div>
              )}
            </Button>
          </div>
          <div>
            <p className="forgot-password">
              Do not have an existing account?{' '}
              <Link to="/user-registration">Register here</Link>
            </p>
          </div>
        </div>
        <Form />
      </div>
    );
  }
}

export default withRouter(Signin);
