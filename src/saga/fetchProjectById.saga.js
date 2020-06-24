import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchProjectById } from '../services/user.project';

import { fetchProjectByIdSuccess, fetchProjectByIdFailure } from '../actions';

function* fetchProjectByIdAsync({ payload }) {
  try {
    let project = yield call(fetchProjectById, payload.id);

    yield put(
      fetchProjectByIdSuccess(project.projectTitle, project.projectDescription),
    );
  } catch (error) {
    yield put(fetchProjectByIdFailure(error.message));
  }
}

export function* watchFetchProjectById() {
  yield takeEvery('FETCH_PROJECT_BY_ID_REQUEST', fetchProjectByIdAsync);
}
