export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const EDIT_USER_DETAILS_REQUEST = 'EDIT_USER_DETAILS_REQUEST';
export const EDIT_USER_DETAILS_FAILURE = 'EDIT_USER_DETAILS_FAILURE';
export const EDIT_USER_DETAILS_SUCCESS = 'EDIT_USER_DETAILS_SUCCESS';
export const FETCH_ALL_PROJECT_REQUEST = 'FETCH_ALL_PROJECT_REQUEST';
export const FETCH_ALL_PROJECT_SUCCESS = 'FETCH_ALL_PROJECT_SUCCESS';
export const FETCH_ALL_PROJECT_FAILURE = 'FETCH_ALL_PROJECT_FAILURE';

export const requestUser = () => ({
  type: 'FETCH_USER_REQUEST',
});

export const requestUserSuccess = (firstName, lastName, email, phone) => ({
  type: 'FETCH_USER_SUCCESS',
  payload: {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  },
});

export const requestUserFailure = error => ({
  type: 'FETCH_USER_FAILURE',
  error: error,
});

export const editUserDetails = (firstName, lastName, email, phone) => {
  return {
    type: 'EDIT_USER_DETAILS_REQUEST',
    payload: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    },
  };
};

export const editUserDetailsFailure = error => ({
  type: 'EDIT_USER_DETAILS_FAILURE',
  error: error,
});

export const editUserDetailsSuccess = (firstName, lastName, email, phone) => ({
  type: 'EDIT_USER_DETAILS_SUCCESS',
  payload: {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  },
});

export const createProjectRequest = projectTitle => {
  console.log('inside create proejvt action');
  console.log('inside action details', projectTitle);
  return {
    type: 'CREATE_PROJECT_REQUEST',
    payload: {
      projectTitle: projectTitle,
    },
  };
};

export const createProjectSuccess = projectTitle => {
  console.log('create project suucessfyl');
  return {
    type: 'CREATE_PROJECT_SUCCESS',
    payload: {
      projectTitle: projectTitle,
    },
  };
};

export const createProjectFailure = error => ({
  type: 'CREATE_PROJECT_FAILURE',
  error: error,
});

export const fetchAllProjectRequest = () => ({
  type: 'FETCH_ALL_PROJECT_REQUEST',
});

// export const fetchProjectRequest = () => ({
//   type: 'FETCH_PROJECT_REQUEST',
// });

// export const fetchProjectSuccess = (projectTitle, projectDescription) => ({
//   type: 'FETCH_PROJECT_SUCCESS',
//   payload: {
//     projectTitle: projectTitle,
//     projectDescription: projectDescription,
//   },
// });

// export const fetchProjectFailure = error => ({
//   type: 'FETCH_PROJECT_FAILURE',
//   error: error,
// });
