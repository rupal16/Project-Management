import { put, call, takeEvery } from 'redux-saga/effects';
import { createProject } from '../services/user.project';

import { createProjectSuccess, createProjectFailure } from '../actions';

function* createProjectAsync({ payload }) {
  try {
    const a = yield call(
      createProject,
      payload.projectTitle,
      payload.projectDescription,
    );

    yield put(createProjectSuccess(a));
  } catch (error) {
    yield put(createProjectFailure(error.message));
  }
}

export function* watchCreateProject() {
  yield takeEvery('CREATE_PROJECT_REQUEST', createProjectAsync);
}
