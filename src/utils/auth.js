import React from 'react' ;
import * as firebase from "firebase" ;
import firebaseApp from "../config/Fire" ;

var globalConfirmationResult;

export default function sendOtp(phoneNumber) {
    firebaseApp.auth().useDeviceLanguage();
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha-container'
        );
        var appVerifier = window.recaptchaVerifier;
        firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
        console.log("confirmation result", confirmationResult);
        globalConfirmationResult = confirmationResult;
    //   let code = prompt("Enter the OTP","")
    //   window.confirmationResult = confirmationResult;
    // if(code === null) return;

    // e.confirm(code)
    }).catch(error => {
        console.log("error", error);
    }) ;
}
        // console.log
      // Error; SMS not sent
      // ...
    // });
//     return (
//         <div>
            
//         </div>
//     )
// }

// export default sendOtp
