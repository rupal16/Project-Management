import * as firebase from 'firebase';
import firebaseApp from '../config/firebase';

const sendOtp = (phoneNumber, callback, errorCallback) => {
  firebaseApp.auth().useDeviceLanguage();

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    'recaptcha-container',
  );
  const appVerifier = window.recaptchaVerifier;

  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(confirmationResult => {
      window.confirmationResult = confirmationResult;
      callback();
    })
    .catch(error => {
      console.log(error);
      errorCallback();
    });
};

export default sendOtp;
