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
      console.log('fetchUser failed');
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    case 'FETCH_USER_REQUEST':
      console.log('fetching user');
      console.log('from reducer');
      return Object.assign({}, state, {
        isLoading: true,
      });

    case 'FETCH_USER_SUCCESS':
      console.log('FetchUser Successful');
      return Object.assign({}, state, {
        isLoading: false,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        phone: action.phone,
      });

    case 'EDIT_USER_DETAILS':
      console.log('from reducer');
      console.log('user details to be updated');
      console.log('action', action);
      return Object.assign({}, state, {
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        phone: action.phone,
      });

    case 'EDIT_USER_DETAILS_FAILURE':
      console.log('User update failed');
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });

    case 'EDIT_USER_DETAILS_SUCCESS':
      console.log('FetchUser Successful');
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
