import { all } from 'redux-saga/effects';

import { watchFetchUser } from './fetchUser.saga';
import { watchEditUser } from './editUser.saga';
import { watchCreateProject } from './createProject.saga';
import { watchFetchAllProjects } from './fetchAllProject.saga';
import { watchRemoveProject } from './removeProject.saga';
import { watchFetchProjectById } from './fetchProjectById.saga';
import { watchUpdateProject } from './updateProject.saga';

export function* rootSaga() {
  yield all([
    watchFetchUser(),
    watchEditUser(),
    watchCreateProject(),
    watchFetchAllProjects(),
    watchRemoveProject(),
    watchFetchProjectById(),
    watchUpdateProject(),
  ]);
}
