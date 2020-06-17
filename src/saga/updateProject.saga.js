import { put, call, takeEvery } from 'redux-saga/effects';
import { updateProject } from '../services/user.project';

import { updateProjectSuccess, updateProjectFailure } from '../actions';

function* updateProjectAsync({ payload }) {
  try {
    console.log('inside update saga', payload);
    yield call(
      updateProject,
      payload.id,
      payload.projectTitle,
      payload.projectDescription,
    );
    console.log('successfuly upadted projects');
    yield put(
      updateProjectSuccess(payload.projectTitle, payload.projectDescription),
    );
  } catch (error) {
    yield put(updateProjectFailure(error.message));
  }
}

export function* watchUpdateProject() {
  yield takeEvery('UPDATE_PROJECT_REQUEST', updateProjectAsync);
}
