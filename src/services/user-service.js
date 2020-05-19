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
    return error;
  }
};

export const saveUser = async (firstName, lastName, phone, email) => {
  try {
    const newUserRef = userDbRef.push();

    newUserRef.set({
      firstName,
      lastName,
      phone,
      email,
    });
  } catch (err) {
    return 1;
  }
};
