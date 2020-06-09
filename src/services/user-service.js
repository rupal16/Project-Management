import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

export const userDbRef = firebaseApp.database();

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

export const saveUser = (firstName, lastName, phone, email) => {
  let userId = firebase.auth().currentUser.uid;

  return firebase
    .database()
    .ref('users/' + userId)
    .set({
      firstName,
      lastName,
      phone,
      email,
    });
};

export const userSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {});
};

export const userUpdate = async (firstName, lastName, email, phone) => {
  let userId = firebase.auth().currentUser.uid;

  userDbRef.ref('users/' + userId + '/firstName').set(firstName);
  userDbRef.ref('users/' + userId + '/lastName').set(lastName);
  userDbRef.ref('users/' + userId + '/email').set(email);
  userDbRef.ref('users/' + userId + '/phone').set(phone);

  return { firstName, lastName, email, phone };
};
