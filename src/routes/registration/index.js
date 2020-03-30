import React, { Component } from 'react'
import './registration.scss' ;
import { Link } from 'react-router-dom' ;
import { Button } from 'react-bootstrap';
import firebase from '../../config/Fire' ;
import initialState from '../../components/initialState' ;
import Input from '../../components/input' ; 


let messageRef = firebase.database().ref('messages');


// const validatePhoneNumber = (number) => {
//     const isValidPhoneNumber = validator.isMobilePhone(number)
//     return (isValidPhoneNumber)
//    }

class Registration extends Component {
    state = initialState;
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
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
    handleClick=(phone)=>{
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        let number = this.state.phone;
        firebase.auth().signInWithPhoneNumber(number, recaptcha).then( function(e) {
          let code = prompt('Enter the otp', '');
    
            
            if(code === null) return;
    
            
            e.confirm(code).then(function (result) {
                console.log(result.user, 'user');
    
                document.querySelector('Button').textContent +=   result.user.phone + "Number verified";
                
            }).catch((error) => {
                console.error( error);
                
            })
    
        })
    
}
//     
//     getPhoneNumberFromUserInput();
// handleClick = () => {
//     // let window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//         "recaptcha-container",
//         {
//         size: "normal",
//         callback: function(response) {
//             submitPhoneNumberAuth();
//         }
//         }
//     );
//     let phoneNumber = this.state.phone;
//     let appVerifier = window.recaptchaVerifier;
//  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
//      .then(function (confirmationResult) {
//        // SMS sent. Prompt user to type the code from the message, then sign the
//        // user in with confirmationResult.confirm(code).
//        alert('sms sent');
//        window.confirmationResult = confirmationResult;
//      }).catch(function (error) {
//        // Error; SMS not sent
//        // ...
//        alert("error");
//      });
// }

// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
//     'size': 'normal',
//     'callback': function(response) {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//       // ...
//       alert('Success');
//     },
//     'expired-callback': function() {
//       // Response expired. Ask user to solve reCAPTCHA again.
//       // ...
//       alert('Failed');
//     }
//   });
//   let recaptchaResponse = grecaptcha.getResponse(window.recaptchaWidgetId);
}
handleClick=(phone)=>{
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    'callback': function(response) {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      // ...
      alert('success');
    },
    'expired-callback': function() {
      // Response expired. Ask user to solve reCAPTCHA again.
      alert('recaptha expired');
      // ...
    }
  });
  recaptchaVerifier.render().then(function(widgetId) {
    window.recaptchaWidgetId = widgetId;
  });
  var recaptchaResponse = grecaptcha.getResponse(window.recaptchaWidgetId);
  var phoneNumber = getPhoneNumberFromUserInput();
var appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
    });
    //sign in the user with verification code
    var code = getCodeFromUserInput();
confirmationResult.confirm(code).then(function (result) {
  // User signed in successfully.
  alert('user signed successfully')
  var user = result.user;
  // ...
}).catch(function (error) {
  // User couldn't sign in (bad verification code?)
  // ...
  alert('unsuccessful attempt');
  let credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
});
firebase.auth().signInWithCredential(credential);
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
                
                <div id="recaptcha">
                    <Button variant="secondary" type="submit" value="submit" onClick={this.state.handleClick}>Submit</Button>{' '}
                </div>
                <br />
                {/* //onClick={this.handleClick} */}
                
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


