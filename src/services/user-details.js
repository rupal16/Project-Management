import * as firebase from 'firebase';

import { userDbRef } from './user-service';

export const getDetails = async () => {
  let userId = firebase.auth().currentUser.uid;

  const snapshot = await userDbRef.ref('/users/' + userId).once('value');
  let firstName = snapshot.val().firstName;
  let lastName = snapshot.val().lastname;
  let email = snapshot.val().email;
  let phone = snapshot.val().phone;
  // throw new Error('hello');
  return { firstName, lastName, email, phone };
};
