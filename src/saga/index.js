import { all } from 'redux-saga/effects';

import { watchFetchUser } from './fetchUser.saga';
import { watchEditUser } from './editUser.saga';
import { watchCreateProject } from './createProject.saga';

export function* rootSaga() {
  yield all([watchFetchUser(), watchEditUser(), watchCreateProject()]);
}
