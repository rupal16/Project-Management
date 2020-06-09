import { put, call, takeEvery } from 'redux-saga/effects';
import { createProject } from '../services/user.project';

import { createProjectSuccess, createProjectFailure } from '../actions';

function* createProjectAsync({ payload }) {
  try {
    console.log('payload', payload);
    yield call(createProject(payload.projectTitle));
    console.log('onto success');
    console.log('projectDtaa', payload);
    yield put(createProjectSuccess(payload.projectTitle));
    console.log('successfull');
  } catch (error) {
    yield put(createProjectFailure(error.message));
  }
}

export function* watchCreateProject() {
  yield takeEvery('CREATE_PROJECT_REQUEST', createProjectAsync);
}
