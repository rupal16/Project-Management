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
    .then(() => {
      callback();   
    })
    .catch(error => {
      // you need to handle error by
      // displaying it in the form
       alert('Invalid OTP');
    });
};

export default sendOtp;
