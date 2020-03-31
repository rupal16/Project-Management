import * as firebase from "firebase";
import firebaseApp from "../config/firebase";

const sendOtp = phoneNumber => {
  firebaseApp.auth().useDeviceLanguage();

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
  );
  const appVerifier = window.recaptchaVerifier;

  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(() => {
      // once the otp is sent you need to display an input
      // field which should take the OTP from user and let user
      // verify on press of submit button
    })
    .catch(error => {
      // you need to handle error by
      // displaying it in the form
    });
};

export default sendOtp;
