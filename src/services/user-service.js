import firebaseApp from '../config/firebase';

const userDbRef = firebaseApp.database().ref('user');

export const isPhoneRegistered = phone => {
  return userDbRef.once('value').then(snapshot => {
    let isNumberRegistered = false;
    snapshot.forEach(snapshotData => {
      let data = snapshotData.val();
      if (data.phone.val === phone.val) {
        isNumberRegistered = true;
      }
    });
    return isNumberRegistered;
  });
};

export const saveUser = (firstName, lastName, phone, email) => {
  const newUserRef = userDbRef.push();

  newUserRef.set({
    firstName,
    lastName,
    phone,
    email,
  });
};
