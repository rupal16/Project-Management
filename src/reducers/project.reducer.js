const userProject = (
  state = {
    isLoading: false,
    error: '',
    projects: {},
  },
  action,
) => {
  switch (action.type) {
    case 'CREATE_PROJECT_REQUEST':
      return Object.assign({}, state, {
        projectTitle: action.payload.projectTitle,
        projectDescription: action.payload.projectDescription,
      });
    // case 'REMOVE_PROJECT_SUCCESS':
    //   return {
    //     ...state,
    //     projects: state.projects.filter(
    //       project => project.id !== action.payload.id,
    //     ),
    //   };

    case 'CREATE_PROJECT_SUCCESS':
      // let id = action.payload.id;
      console.log('newdate', state.projects);
      let newData = {
        isLoading: false,
        error: '',
        // projects: { ...state.projects, '1234': action.payload },
        projects: action.payload.projects,
      };

      return newData;

    // return {
    //   newData
    // }
    // ...state,{
    //   projects: [
    //     ...state.projects,
    //     // {
    //     //   projectTitle: action.payload.projectTitle,
    //     //   projectDescription: action.payload.projectDescription,
    //     // },
    //     action.payload,
    //   ],
    // }
    // isLoading: false,

    // };

    // case 'CREATE_PROJECT_SUCCESS':
    //   return Object.assign({}, state, {
    //     projectTitle: action.payload.projectTitle,
    //     projectDescription: action.payload.projectDescription,
    //   });
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
      console.log('remove project reducer');
      let ids = Object.keys(state.projects).filter(
        id => id !== action.payload.id,
      );
      let projects = {};
      ids.map(id => {
        projects[id] = state.projects[id];
      });
      return {
        ...state,
        projects,
      };

    case 'REMOVE_PROJECT_FAILURE':
      return Object.assign({}, state, {
        error: action.error,
      });

    case 'FETCH_PROJECT_BY_ID_REQUEST':
      return Object.assign({}, state, { isLoading: true });

    case 'FETCH_PROJECT_BY_ID_SUCCESS':
      return Object.assign({}, state, {
        projectTitle: action.payload.projectTitle,
        projectDescription: action.payload.projectDescription,
      });

    case 'FETCH_PROJECT_BY_ID_FAILURE':
      return Object.assign({}, state, {
        error: action.error,
      });

    case 'UPDATE_PROJECT_REQUEST':
      return Object.assign({}, state, {
        projectTitle: action.payload.projectTitle,
        projectDescription: action.payload.projectDescription,
      });

    case 'UPDATE_PROJECT_SUCCESS':
      return Object.assign({}, state, {
        projectTitle: action.payload.projectTitle,
        projectDescription: action.payload.projectDescription,
      });

    case 'UPDATE_PROJECT_FAILURE':
      return Object.assign({}, state, {
        error: action.error,
      });

    default:
      return state;
  }
};

export { userProject };
