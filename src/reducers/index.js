import { combineReducers } from 'redux';

import { userProfile } from './user.reducer';

const rootReducer = combineReducers({
  userProfile,
});

export { rootReducer };
