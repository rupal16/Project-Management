import * as firebase from 'firebase';

import { userDbRef } from './user-service';

export const getDetails = async () => {
  let userId = firebase.auth().currentUser.uid;

  const snapshot = await userDbRef.ref('/users/' + userId).once('value');
  let firstName = snapshot.val().firstName;
  let lastName = snapshot.val().lastName;
  let email = snapshot.val().email;
  let phone = snapshot.val().phone;

  return { firstName, lastName, email, phone };
};
