import React from 'react';
import { Redirect } from "react-router-dom";
import firebaseApp from '../config/firebase';

const userDbRef = firebaseApp.database().ref("user");

export const saveUser = () => {
    const { firstName, lastName, phone, email, password } = this.state;
    var newUserRef = userDbRef.push();
    
    newUserRef.set({
    firstName,
    lastName,
    phone,
    email,
    password
    });
    // document.location.reload()
    // <Redirect to="/dashboard" />
    return <Redirect to='/dashboard' />
    
};