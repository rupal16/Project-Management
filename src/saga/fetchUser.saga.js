import { put, call, takeEvery } from 'redux-saga/effects';
import { getDetails } from '../services/user-details';

import { requestUserFailure, requestUserSuccess } from '../actions';

function* fetchUserAsync() {
  try {
    const userData = yield call(getDetails);
    console.log('useeerr data', userData);
    // let firstName = userData.firstName;
    // let lastName = userData.lastName;
    // yield put(requestUserSucceeded(firstName, lastName));
    yield put(
      requestUserSuccess(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.phone,
      ),
    );

    console.log('data', userData);
  } catch (error) {
    yield put(requestUserFailure(error.message));
  }
}

export function* watchFetchUser() {
  yield takeEvery('FETCH_USER_REQUEST', fetchUserAsync);
}

// export default [takeEvery('FETCH_USER_REQUEST', fetchUserAsync)];
