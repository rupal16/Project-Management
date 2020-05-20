import firebaseApp from '../config/firebase';

const userDbRef = firebaseApp.database().ref('user');

export const isPhoneRegistered = phone => {
  return userDbRef.once('value');
};

export const saveUser = (firstName, lastname, phone, email) => {
  const newUserRef = userDbRef.push();

  return newUserRef.set({
    firstName,
    lastname,
    phone,
    email,
  });
};
