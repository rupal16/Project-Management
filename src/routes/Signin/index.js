import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Spinner, Form } from 'react-bootstrap';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { isPhoneRegistered } from '../../services/user-service';
import sendOtp from '../../services/send-otp';

import Input from '../../components/Input';
import ErrorModal from '../../components/ErrorModal';

import './style.scss';

class Signin extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      errorContent: '',
      otpSent: false,
      initialSubmit: true,
      isloading: false,
      isUserRegistered: false,

      phone: {
        val: '',
      },
      otp: {
        val: '',
      },
    };
  }

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
    let formError = false;

    if (!phone.val.trim()) {
      formError = true;
    } else if (phone.val.length !== 14) {
      formError = true;
    }

    if (formError) {
      return false;
    }
    return true;
  };

  checkUser = async phone => {
    const isValid = this.validate();
    if (isValid) {
      try {
        let value = await isPhoneRegistered(phone);
        if (!value) {
          this.setState({
            isError: true,
            errorContent: 'You do not have an existing account!',
          });
        } else {
          this.handleOtp(phone);
        }
      } catch (err) {
        this.setState({
          isError: true,
          errorContent:
            'Your request cannot be processed at the moment. Please try again later',
        });
      }
    }
  };

  handleSubmit = async event => {
    const { phone, initialSubmit, otp } = this.state;
    event.preventDefault();

    if (initialSubmit) {
      this.setState({
        isloading: true,
      });
      const isValid = this.validate();
      if (isValid) {
        this.disableInputField();
        await this.checkUser(phone);
        this.setState({
          isloading: false,
        });
      } else {
        this.setState({
          isError: true,
          errorContent: 'Check your number',
          isloading: false,
        });
      }
    } else {
      const isValid = this.validate();
      if (isValid) {
        const confirmationResult = window.confirmationResult;
        const userEnteredOtp = otp.val;
        try {
          await confirmationResult.confirm(userEnteredOtp);
          this.props.history.push('./dashboard');
        } catch (err) {
          this.setState({
            isError: true,
            errorContent: 'Invalid Otp',
          });
        }
      }
    }
  };

  handleOtp = async phone => {
    await sendOtp(
      phone.val,
      () =>
        this.setState({
          ...this.state,
          otpSent: true,
          initialSubmit: false,
        }),
      () => {
        this.setState({
          isError: true,
          errorContent:
            'Your request cannot be processed at the moment. Please try again later',
        });
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
    var inputDomElements = document.getElementsByTagName('input'); //change to fieldset
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

  cancelButton = event => {
    this.setState({
      isError: false,
    });
  };

  render() {
    const { phone, otp, otpSent, isError } = this.state;
    return (
      <div className="signinpage">
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

          <div id="recaptcha">
            <Button
              type="submit"
              variant="secondary"
              value="submit"
              onClick={this.handleSubmit}
              className="buttonStyle"
              disabled={this.isloading}
            >
              {this.state.isloading && (
                <div>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span style={{ leftMargin: '30px' }}>Please wait...</span>
                </div>
              )}
              {!this.state.isloading && (
                <div>
                  <span>Submit</span>
                </div>
              )}
            </Button>
          </div>
          <div className="registerHereLink">
            <p>
              Do not have an existing account?{' '}
              <Link to="/user-registration">Register here</Link>
            </p>
          </div>
          {!otpSent && <div id="recaptcha-container" />}
        </div>
        <Form />

        {isError && (
          <ErrorModal
            showError={this.state.isError}
            errorContent={this.state.errorContent}
            onClick={this.cancelButton}
          />
        )}
      </div>
    );
  }
}

export default withRouter(Signin);
