const userProject = (
  state = {
    isLoading: false,
    error: '',
    projectTitle: '',
    projectDescription: '',
  },
  action,
) => {
  switch (action.type) {
    case 'CREATE_PROJECT_REQUEST':
      return Object.assign({}, state, {
        projectTitle: action.payload.projectTitle,
        projectDescription: action.payload.projectDescription,
      });

    case 'CREATE_PROJECT_SUCCESS':
      return Object.assign({}, state, {
        projectTitle: action.payload.projectTitle,
        projectDescription: action.payload.projectDescription,
      });

    case 'CREATE_PROJECT_FAILURE':
      return Object.assign({}, state, {
        error: action.error,
      });

    case 'FETCH_PROJECT_FAILURE':
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    case 'FETCH_PROJECT_REQUEST':
      return Object.assign({}, state, {
        isLoading: true,
      });

    case 'FETCH_PROJECT_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        projectTitle: action.payload.projectTitle,
        projectDescription: action.payload.projectDescription,
      });

    default:
      return state;
  }
};

export { userProject };
