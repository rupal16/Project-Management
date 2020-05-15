// import React from 'react';
// import { Redirect } from "react-router-dom";
import firebaseApp from '../config/firebase';

const userDbRef = firebaseApp.database().ref('user');

export const saveUser = (firstName, lastName, phone, email) => {
  const newUserRef = userDbRef.push();

  newUserRef.set({
    firstName,
    lastName,
    phone,
    email,
  });
};
