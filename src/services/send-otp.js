import * as firebase from "firebase";
import firebaseApp from "../config/firebase";

const sendOtp = (phoneNumber, callback) => {

  firebaseApp.auth().useDeviceLanguage();

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
  );
  const appVerifier = window.recaptchaVerifier;

  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult)=> {
      console.log("Confirmtion Result " + confirmationResult);
      window.confirmationResult = confirmationResult;
      callback();  
  })
    .catch(error => {
       alert('Invalid OTP');
    });
};

export default sendOtp;
