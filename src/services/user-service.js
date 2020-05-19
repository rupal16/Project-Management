import firebaseApp from '../config/firebase';

const userDbRef = firebaseApp.database().ref('user');

export const isPhoneRegistered = async phone => {
  let error = false;
  try {
    const isRegistered = await userDbRef.once('value').then(snapshot => {
      let isNumberRegistered = false;
      snapshot.forEach(snapshotData => {
        let data = snapshotData.val();
        if (data.phone.val === phone.val) {
          isNumberRegistered = true;
        }
      });
      return isNumberRegistered;
    });
    return isRegistered;
  } catch (err) {
    error = true;
    return error;
  }
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
