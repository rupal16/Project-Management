
import * as firebase from "firebase" ;
import firebaseApp from "../config/Fire" ;
// import getOtp from './getOtp' ;

export default function sendOtp(phoneNumber) {
    firebaseApp.auth().useDeviceLanguage();
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
        );
        var appVerifier = window.recaptchaVerifier;
        firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
        var globalConfirmationResult = confirmationResult;
        console.log("globalConfirmationResult",globalConfirmationResult)
        // window.confirmationResult = confirmationResult;
        let code = prompt("enter otp: ", "");
        confirmationResult.confirm(code).then(function (result) {
          
            alert("Successfully signed in");
            // var user = result.user;
        
          }).catch(function (error) {
  
            alert("Invalid OTP!")
          });

    }).catch(error => {
        console.log("error", error);
    }) ;
    
  
}
