import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'project-management-8014f.firebaseapp.com',
  databaseURL: 'https://project-management-8014f.firebaseio.com',
  projectId: 'project-management-8014f',
  storageBucket: 'project-management-8014f.appspot.com',
  messagingSenderId: '8695791854',
  appId: '1:8695791854:web:4f961df3bd3aefcde273ff',
  measurementId: 'G-B7ESFBK1HZ',
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
