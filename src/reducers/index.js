import { combineReducers } from 'redux';

import { userProfile } from './user.reducer';
import { userProject } from './project.reducer';

const rootReducer = combineReducers({
  userProfile,
  userProject,
});

export { rootReducer };
