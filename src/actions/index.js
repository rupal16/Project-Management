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
export const UPDATE_PROJECT_REQUEST = 'UPDATE_PROJECT_REQUEST';
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const UPDATE_PROJECT_FAILURE = 'UPDATE_PROJECT_FAILURE';
export const ADD_LIST_REQUEST = 'ADD_LIST_REQUEST';
export const ADD_LIST_SUCCESS = 'ADD_LIST_SUCCESS';
export const ADD_LIST_FAILURE = 'ADD_LIST_FAILURE';
export const ADD_CARD_REQUEST = 'ADD_CARD_REQUEST';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const ADD_CARD_FAILURE = 'ADD_CARD_FAILURE';
export const DRAG_HAPPENED = 'DRAG_HAPPENED';

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
  return {
    type: 'CREATE_PROJECT_REQUEST',
    payload: {
      projectTitle: projectTitle,
      projectDescription: projectDescription,
    },
  };
};

export const createProjectSuccess = projects => {
  return {
    type: 'CREATE_PROJECT_SUCCESS',
    payload: {
      // projectTitle: projectTitle,
      // projectDescription: projectDescription,
      projects,
    },
  };
};

export const createProjectFailure = error => ({
  type: 'CREATE_PROJECT_FAILURE',
  error: error,
});

export const removeProjectRequest = id => {
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
  error: error.message,
});

export const fetchAllProjectsRequest = () => {
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

export const fetchProjectByIdSuccess = (projectTitle, projectDescription) => ({
  type: 'FETCH_PROJECT_BY_ID_SUCCESS',
  payload: {
    projectTitle: projectTitle,
    projectDescription: projectDescription,
  },
});

export const fetchProjectByIdFailure = error => ({
  type: 'FETCH_PROJECT_BY_ID_FAILURE',
  error: error,
});

export const updateProjectRequest = (id, projectTitle, projectDescription) => ({
  type: 'UPDATE_PROJECT_REQUEST',
  payload: {
    id: id,
    projectTitle: projectTitle,
    projectDescription: projectDescription,
  },
});

export const updateProjectSuccess = (projectTitle, projectDescription) => ({
  type: 'UPDATE_PROJECT_SUCCESS',
  payload: {
    projectTitle: projectTitle,
    projectDescription: projectDescription,
  },
});

export const updateProjectFailure = error => ({
  type: 'UPDATE_PROJECT_FAILURE',
  error: error,
});

//add list
export const addListRequest = (listId, title) => {
  console.log('from add list action', listId, title);
  return {
    type: 'ADD_LIST_REQUEST',
    payload: {
      listId: listId,
      title: title,
    },
  };
};

export const addListSuccess = (listId, title) => {
  console.log('from addlist success action', listId);
  console.log('from add list action', listId, title);
  return {
    type: 'ADD_LIST_SUCCESS',
    payload: {
      listId: listId,
      title: title,
    },
  };
};

export const addListFailure = error => {
  return {
    type: 'ADD_LIST_FAILURE',
    error: error,
  };
};

export const addCardRequest = (listId, text) => {
  console.log('add card request');
  return {
    type: 'ADD_CARD_REQUEST',
    payload: {
      listId: listId,
      text: text,
    },
  };
};

export const addCardSuccess = (listId, text) => {
  console.log('add card success');
  return {
    type: 'ADD_CARD_SUCCESS',
    payload: {
      listId: listId,
      text: text,
    },
  };
};

export const addCardFailure = error => {
  console.log('add card failure');
  return {
    type: 'ADD_CARD_FAILURE',
    error: error,
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type,
) => {
  return {
    type: 'DRAG_HAPPENED',
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type,
    },
  };
};
