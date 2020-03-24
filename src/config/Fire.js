import app from 'firebase/app';
import 'firebase/auth';



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

  class Firebase {
      constructor(){
          app.initializeApp(config);
          this.auth = app.auth();
      }

      doCreateUserWithDetails = (firstName,lastName,email, password,confirmedPassword) =>
    this.auth.createUserWithDetails(firstName,lastName,email, password,confirmedPassword);

    doSignUpWithDetails = (firstName,lastName,email, password,confirmedPassword) =>
    this.auth.signUpWithDetails(firstName,lastName,email, password,confirmedPassword);

    doSignOut = () => this.auth.signOut();
    // doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    // doPasswordUpdate = password =>
    // this.auth.currentUser.updatePassword(password);
}
  

  export default Firebase