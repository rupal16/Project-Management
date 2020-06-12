export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const EDIT_USER_DETAILS_REQUEST = 'EDIT_USER_DETAILS_REQUEST';
export const EDIT_USER_DETAILS_FAILURE = 'EDIT_USER_DETAILS_FAILURE';
export const EDIT_USER_DETAILS_SUCCESS = 'EDIT_USER_DETAILS_SUCCESS';
export const FETCH_ALL_PROJECTS_REQUEST = 'FETCH_ALL_PROJECTS_REQUEST';
export const FETCH_ALL_PROJECTS_SUCCESS = 'FETCH_ALL_PROJECTS_SUCCESS';
export const FETCH_ALL_PROJECTS_FAILURE = 'FETCH_ALL_PROJECTS_FAILURE';
export const REMOVE_PROJECT_REQUEST = 'REMOVE_PROJECT_REQUEST';
export const REMOVE_PROJECT_SUCCESS = 'REMOVE_PROJECT_SUCCESS';
export const REMOVE_PROJECT_FAILURE = 'REMOVE_PROJECT_FAILURE';

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

export const createProjectRequest = (projectTitle, projectDescription) => {
  console.log('inside create proejvt action');
  console.log('inside action details', projectTitle);
  return {
    type: 'CREATE_PROJECT_REQUEST',
    payload: {
      projectTitle: projectTitle,
      projectDescription: projectDescription,
    },
  };
};

export const createProjectSuccess = (projectTitle, projectDescription) => {
  console.log('create project suucessfyl');
  return {
    type: 'CREATE_PROJECT_SUCCESS',
    payload: {
      projectTitle: projectTitle,
      projectDescription: projectDescription,
    },
  };
};

export const createProjectFailure = error => ({
  type: 'CREATE_PROJECT_FAILURE',
  error: error,
});

// export const fetchAllProjectsRequest = () => ({
//   type: 'FETCH_ALL_PROJECT_REQUEST',
// });

//remove project

export const removeProjectRequest = id => {
  console.log('remove action', id);
  return {
    type: 'REMOVE_PROJECT_REQUEST',
    payload: {
      id: id,
    },
  };
};

export const removeProjectSuccess = id => ({
  type: 'REMOVE_PROJECT_SUCCESS',
  payload: {
    id: id,
  },
});

export const removeProjectFailure = error => ({
  type: 'REMOVE_PROJECT_FAILURE',
  error: error,
});

//fetch all project

// export const fetchAllProjectsRequest = () => ({
//   type: 'FETCH_ALL_PROJECTS_REQUEST',
//   // payload: {
//   //   projects: [],
//   // },
// });

export const fetchAllProjectsRequest = () => {
  console.log('inside action');
  return {
    type: 'FETCH_ALL_PROJECTS_REQUEST',
  };
};

export const fetchAllProjectsSuccess = projects => ({
  type: 'FETCH_ALL_PROJECTS_SUCCESS',
  payload: {
    projects: projects,
  },
});

export const fetchAllProjectsFailure = error => ({
  type: 'FETCH_ALL_PROJECTS_FAILURE',
  error: error,
});

//
export const fetchProjectByIdRequest = id => ({
  type: 'FETCH_PROJECT_BY_ID_REQUEST',
  payload: {
    id: id,
  },
});

export const fetchProjectByIdSuccess = id => ({
  type: 'FETCH_PROJECT_BY_ID_SUCCESS',
  payload: {
    id: id,
  },
});

export const fetchProjectByIdFailure = id => ({
  type: 'FETCH_PROJECT_BY_ID_FAILURE',
  error: 'error',
});
