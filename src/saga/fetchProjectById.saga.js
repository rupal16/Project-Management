import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchProjectById } from '../services/user-details';

import { requestUserFailure, requestUserSuccess } from '../actions';

function* fetchProjectByIdAsync({ payload }) {
  try {
    const userData = yield call(fetchProjectById);

    yield put(
      requestUserSuccess(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.phone,
      ),
    );
  } catch (error) {
    yield put(requestUserFailure(error.message));
  }
}

export function* watchFetchProjectById() {
  yield takeEvery('FETCH_PROJECT_BY_ID_REQUEST', fetchProjectByIdAsync);
}
