import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { Edit, AddAPhoto } from '@material-ui/icons';

import { requestUser } from '../../actions';

import EditDetails from '../../components/editDetails';

import './style.scss';

const Profile = ({ error, firstName, lastName, email, phone }) => {
  const dispatch = useDispatch();
  let userObj = {
    firstName,
    lastName,
    email,
    phone,
  };

  const [isUpdate, setUpdate] = useState(false);

  useEffect(() => {
    dispatch(requestUser());
  }, []);

  const handleUpdateComplete = () => {
    setUpdate(false);
  };

  return (
    <div className="field-wrapper">
      <h1>User Profile</h1>

      <div className="user-profile-box">
        <div>
          <Avatar className="user-avatar" />
          <AddAPhoto className="add-photo" />
        </div>
        <div className="details">
          <div className="each-field">
            <p className="fields">First Name : </p>
            <p className="field-value">{firstName}</p>
          </div>

          <div className="each-field">
            <p className="fields">Last Name : </p>
            <p className="field-value">{lastName}</p>
          </div>

          <div className="each-field">
            <p className="fields">Email : </p>
            <p className="field-value">{email}</p>
          </div>

          <div className="each-field">
            <p className="fields">Phone : </p>
            <p className="field-value">{phone}</p>
          </div>
        </div>
        <Edit
          className="edit"
          onClick={() => {
            setUpdate(true);
            console.log('isupdate is clicked', isUpdate);
          }}
        />
      </div>
      {isUpdate && <EditDetails {...userObj} onUpdate={handleUpdateComplete} />}
      {error}
    </div>
  );
};

const mapStateToProps = state => {
  console.log('state userprofile', state.userProfile);
  return {
    isLoading: state.userProfile.isLoading,
    error: state.userProfile.error,
    firstName: state.userProfile.firstName,
    lastName: state.userProfile.lastName,
    email: state.userProfile.email,
    phone: state.userProfile.phone,
  };
};

export default connect(mapStateToProps, null)(Profile);
