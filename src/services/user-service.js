import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

const userDbRef = firebaseApp.database();

let ref = userDbRef.ref('users');
// export const isPhoneRegistered = phone => {
//   let userId = firebase.auth().uid;
//   console.log("uid", userId)
//   return userDbRef.ref('users').once('value').then(snapshot => {
//     let isRegistered = false;
//     snapshot.forEach(snapshotData => {

//       let data = snapshotData.val();
//       if (data.phone.val === phone.val) {
//         isRegistered = true;
//       }
//     });
//     console.log("snapshot.val", snapshot.val())
//     return isRegistered;
//   });
// }

// };
export const isPhoneRegistered = (phone, cb) => {
  let num = phone.val;

  let isRegistered = false;
  ref.on(
    'value',
    function(data) {
      let email = data.val();
      let keys = Object.keys(email);
      for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        let val = email[k].phone;
        if (num === val) {
          isRegistered = true;
          break;
        }
      }
      cb(isRegistered);
    },
    function(error) {},
  );
};

// let data = ref.on('value');
// let email = data.val();
// console.log("email", email)
// return userDbRef.ref('users').once('value').then(snapshot => {
//   let isRegistered = false;
//   console.log("inside")
//   let dbUser = userDbRef.getInstance().getReference("users");
//   console.log("dbuser", dbUser);
//   snapshot.forEach(snapshotData => {

//     let data = snapshotData.val();

// if (data.phone.val === phone.val) {
//   isRegistered = true;
// }

// console.log("snapshot.val", snapshot.val())
// return isRegistered;
//   });

// };

// const gotData = (data) => {
//   console.log("hi from")
//   console.log("data", data)
//   console.log("data.val");
//   console.log(data.val());
//   let email = data.val();
//   console.log("email", email)
//   let keys = Object.keys(email);
//   console.log("keys: ")
//   console.log(keys)
//   let yes = Object.values(email);
//   let yesl = yes[yes.phoneNumber]
//   console.log("yesl", yesl)
//   for (let i = 0; i < keys.length; i++) {
//     let k = keys[i];
//     var phone = email[k].phoneNumber;

//     console.log(k)
//   }
// }
// const gotData = (data) => {
//   console.log("hi from gotdata")
//   let email = data.val();
//   console.log("email", email)
//   let keys = Object.keys(email);
//   console.log("keys", keys)
//   for (let i = 0; i < keys.length; i++) {
//     let k = keys[i];
//     let val = email[k].phone;
//     console.log(val)

//   }

// }

// const errData = err => {
//   console.log("error");
//   console.log(err);
// }

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
