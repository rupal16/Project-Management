import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

const userDbRef = firebaseApp.database();

export const isPhoneRegistered = phone => {
  return userDbRef
    .ref('users')
    .orderByChild('phone')
    .once('value')
    .then(snapshot => {
      let isRegistered = false;
      snapshot.forEach(function(childSnapshot) {
        var num = childSnapshot.val().phone;
        console.log('phone', phone);
        if (num === phone.val) {
          isRegistered = true;
          return isRegistered;
        }
      });
      return isRegistered;
    });
};

export const saveUser = (firstName, lastname, phone, email) => {
  let userId = firebase.auth().currentUser.uid;

  return firebase
    .database()
    .ref('users/' + userId)
    .set({
      firstName,
      lastname,
      phone,
      email,
    });
};
