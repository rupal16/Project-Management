import { combineReducers } from 'redux';

import { userProfile } from './user.reducer';
import { userProject } from './project.reducer';
import { listsReducer } from './lists.reducer';
import { cardsReducer } from './cards.reducer';

const rootReducer = combineReducers({
  userProfile,
  userProject,
  listsReducer,
  cardsReducer,
});

export { rootReducer };
