const userProject = (
  state = {
    isLoading: false,
    error: '',
    projects: [],
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

    case 'FETCH_ALL_PROJECTS_FAILURE':
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    case 'FETCH_ALL_PROJECTS_REQUEST':
      return Object.assign({}, state, {
        isLoading: true,
      });

    case 'FETCH_ALL_PROJECTS_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        projects: action.payload.projects,
      });

    case 'REMOVE_PROJECT_REQUEST':
      return Object.assign({}, state, {
        isLoading: true,
      });

    case 'REMOVE_PROJECT_SUCCESS':
      console.log('action payload', action.payload.id);
      console.log('project id inside ', state.projects.id);
      return state.filter(projects => state.projects.id !== action.payload.id);

    default:
      return state;
  }
};

export { userProject };
