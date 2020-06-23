import { put, call, takeEvery } from 'redux-saga/effects';
import { createProject } from '../services/user.project';

import { createProjectSuccess, createProjectFailure } from '../actions';

function* createProjectAsync({ payload }) {
  try {
    console.log('create project saga');
    // const args = {
    //    payload.projectTitle,
    //    payload.projectDescription,
    // };

    // let args = [payload.projectTitle, payload.projectDescription];
    // console.log('args', args);
    // console.log('payload', payload);

    const a = yield call(
      createProject,
      payload.projectTitle,
      payload.projectDescription,
    );
    console.log('create service', a);

    yield put(
      // createProjectSuccess(payload.projectTitle, payload.projectDescription),
      createProjectSuccess(a),
    );
  } catch (error) {
    yield put(createProjectFailure(error.message));
  }
}

export function* watchCreateProject() {
  yield takeEvery('CREATE_PROJECT_REQUEST', createProjectAsync);
}
