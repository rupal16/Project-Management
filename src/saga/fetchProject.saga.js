import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchProject } from '../services/user.project';

import { fetchProjectSuccess, fetchProjectFailure } from '../actions';

function* fetchProjectAsync() {
  try {
    const projectData = yield call(fetchProject);

    yield put(
      fetchProjectSuccess(
        projectData.projectTitle,
        projectData.projectDescription,
      ),
    );
  } catch (error) {
    yield put(fetchProjectFailure(error.message));
  }
}

export function* watchFetchProject() {
  yield takeEvery('FETCH_PROJECT_REQUEST', fetchProjectAsync);
}
