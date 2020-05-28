import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

const userDbRef = firebaseApp.database();

export const isPhoneRegistered = async phone => {
  return userDbRef
    .ref('users')
    .orderByChild('phone')
    .equalTo(phone.val)
    .once('value')
    .then(snapshot => {
      let isRegistered = false;
      snapshot.forEach(function(childSnapshot) {
        isRegistered = true;
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

export const userSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('user is signed out');
    });
};
