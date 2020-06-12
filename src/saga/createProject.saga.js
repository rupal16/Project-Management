import { put, call, takeEvery } from 'redux-saga/effects';
import { createProject } from '../services/user.project';

import { createProjectSuccess, createProjectFailure } from '../actions';

function* createProjectAsync({ payload }) {
  try {
    console.log('payload', payload);
    yield call(createProject(payload.projectTitle, payload.projectDescription));
    console.log('onto success');
    console.log('projectDtaa', payload);
    yield put(
      createProjectSuccess(payload.projectTitle, payload.projectDescription),
    );
    console.log('successfull');
  } catch (error) {
    yield put(createProjectFailure(error.message));
  }
}

export function* watchCreateProject() {
  yield takeEvery('CREATE_PROJECT_REQUEST', createProjectAsync);
}
