import firebaseApp from '../config/firebase';

const userDbRef = firebaseApp.database().ref('user');

export const isPhoneRegistered = phone => {
  return userDbRef.once('value').then(snapshot => {
    let isRegistered = false;
    snapshot.forEach(snapshotData => {
      let data = snapshotData.val();
      if (data.phone.val === phone.val) {
        isRegistered = true;
      }
    });
    return isRegistered;
  });
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
