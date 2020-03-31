import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDx6G7Xd2COPEvOYINW45jjIxoVx94WE1A",
  authDomain: "project-management-8014f.firebaseapp.com",
  databaseURL: "https://project-management-8014f.firebaseio.com",
  projectId: "project-management-8014f",
  storageBucket: "project-management-8014f.appspot.com",
  messagingSenderId: "8695791854",
  appId: "1:8695791854:web:4f961df3bd3aefcde273ff",
  measurementId: "G-B7ESFBK1HZ"
};

const firebaseApp = firebase.initializeApp(config);

export const userDbRef = firebaseApp.database().ref("user");
export default firebaseApp;
