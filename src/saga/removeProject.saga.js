import { put, call, takeEvery } from 'redux-saga/effects';
import { removeProject } from '../services/user.project';

import { removeProjectSuccess, removeProjectFailure } from '../actions';

function* removeProjectAsync({ payload }) {
  try {
    console.log('inside saga', payload.id);
    yield call(removeProject(payload.id));

    yield put(removeProjectSuccess(payload.id));
  } catch (error) {
    yield put(removeProjectFailure(error.message));
  }
}

export function* watchRemoveProject() {
  yield takeEvery('REMOVE_PROJECT_REQUEST', removeProjectAsync);
}
