const userProfile = (
  state = {
    isLoading: false,
    error: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  action,
) => {
  switch (action.type) {
    case 'FETCH_USER_FAILURE':
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    case 'FETCH_USER_REQUEST':
      return Object.assign({}, state, {
        isLoading: true,
      });

    case 'FETCH_USER_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        phone: action.phone,
      });

    case 'EDIT_USER_DETAILS_REQUEST':
      return Object.assign({}, state, {
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        phone: action.phone,
      });

    case 'EDIT_USER_DETAILS_FAILURE':
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });

    case 'EDIT_USER_DETAILS_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        phone: action.phone,
      });
    default:
      return state;
  }
};

export { userProfile };
