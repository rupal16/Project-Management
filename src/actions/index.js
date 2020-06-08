export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const EDIT_USER_DETAILS_REQUEST = 'EDIT_USER_DETAILS_REQUEST';
export const EDIT_USER_DETAILS_FAILURE = 'EDIT_USER_DETAILS_FAILURE';
export const EDIT_USER_DETAILS_SUCCESS = 'EDIT_USER_DETAILS_SUCCESS';

export const requestUser = () => ({
  type: 'FETCH_USER_REQUEST',
});

export const requestUserFailure = error => ({
  type: 'FETCH_USER_FAILURE',
  error: error,
});

export const requestUserSuccess = (firstName, lastName, email, phone) => ({
  type: 'FETCH_USER_SUCCESS',
  firstName: firstName,
  lastName: lastName,
  email: email,
  phone: phone,
});

export const editUserDetails = (firstName, lastName, email, phone) => {
  console.log('inside edit user action');
  console.log('firstname', firstName);
  return {
    type: 'EDIT_USER_DETAILS_REQUEST',
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  };
};

export const editUserDetailsFailure = error => ({
  type: 'EDIT_USER_DETAILS_FAILURE',
  error: error,
});

export const editUserDetailsSuccess = (firstName, lastName, email, phone) => ({
  type: 'EDIT_USER_DETAILS_SUCCESS',
  firstName: firstName,
  lastName: lastName,
  email: email,
  phone: phone,
});
