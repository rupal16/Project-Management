import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchAllProjects } from '../services/user.project';

import { fetchAllProjectsSuccess, fetchAllProjectsFailure } from '../actions';

function* fetchAllProjectsAsync() {
  try {
    let projects = yield call(fetchAllProjects);

    yield put(fetchAllProjectsSuccess(projects));
  } catch (error) {
    yield put(fetchAllProjectsFailure(error.message));
  }
}

export function* watchFetchAllProjects() {
  yield takeEvery('FETCH_ALL_PROJECTS_REQUEST', fetchAllProjectsAsync);
}
