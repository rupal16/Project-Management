import firebaseApp from '../config/firebase';

export const userDbRef = firebaseApp.database().ref("user");