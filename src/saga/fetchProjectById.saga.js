import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchProjectById } from '../services/user.project';

import { fetchProjectByIdSuccess, fetchProjectByIdFailure } from '../actions';

function* fetchProjectByIdAsync({ payload }) {
  try {
    console.log('inside fetch saga', payload.id);
    let project = yield call(fetchProjectById, payload.id);
    console.log('project from saga', project);
    yield put(
      fetchProjectByIdSuccess(
        project.title.projectTitle,
        project.title.projectDescription,
      ),
    );
  } catch (error) {
    yield put(fetchProjectByIdFailure(error.message));
  }
}

export function* watchFetchProjectById() {
  yield takeEvery('FETCH_PROJECT_BY_ID_REQUEST', fetchProjectByIdAsync);
}
