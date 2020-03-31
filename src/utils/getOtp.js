
// import * as firebase from "firebase" ;
// import firebaseApp from "../config/Fire" ;
// import sendOtp from './auth' ;

// export default function getOtp(){
//     var code = getCodeFromUserInput();
// confirmationResult.confirm(code).then(function (result) {
//   alert("User signed in successfully.") 
//   var user = result.user;
//   // ...
// }).catch(function (error) {
//    alert("User couldn't sign in ")
//   // ...
// });
// }
import React from 'react'

function getOtp() {
    return (
        <div>
        <label>Enter OTP:
            <input type="text"></input>
            </label>
        </div>
    )
}

export default getOtp
