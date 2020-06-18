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
    case 'FETCH_USER_REQUEST':
      return Object.assign({}, state, {
        isLoading: true,
        error: '',
      });

    case 'FETCH_USER_FAILURE':
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });

    case 'FETCH_USER_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
      });

    case 'EDIT_USER_DETAILS_REQUEST':
      return Object.assign({}, state, {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
        error: '',
      });

    case 'EDIT_USER_DETAILS_FAILURE':
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });

    case 'EDIT_USER_DETAILS_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
      });
    default:
      return state;
  }
};

export { userProfile };
