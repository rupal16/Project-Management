import { put, call, takeEvery } from 'redux-saga/effects';
import { getDetails } from '../services/user-details';

import { requestUserFailure, requestUserSuccess } from '../actions';

function* fetchUserAsync() {
  try {
    const userData = yield call(getDetails);

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

export function* watchFetchUser() {
  yield takeEvery('FETCH_USER_REQUEST', fetchUserAsync);
}
