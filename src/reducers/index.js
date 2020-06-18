import { combineReducers } from 'redux';

import { userProfile } from './user.reducer';
import { userProject } from './project.reducer';
import { listsReducer } from './lists.reducer';

const rootReducer = combineReducers({
  userProfile,
  userProject,
  listsReducer,
});

export { rootReducer };
