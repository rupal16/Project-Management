import { put, call, takeEvery } from 'redux-saga/effects';
import { userUpdate } from '../services/user-service';

import { editUserDetailsFailure, editUserDetailsSuccess } from '../actions';

function* updateUserAsync({ payload }) {
  try {
    const userData = yield call(
      userUpdate(
        payload.firstName,
        payload.lastName,
        payload.email,
        payload.phone,
      ),
    );
    yield put(
      editUserDetailsSuccess(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.phone,
      ),
    );
  } catch (error) {
    yield put(editUserDetailsFailure(error.message));
  }
}

export function* watchEditUser() {
  yield takeEvery('EDIT_USER_DETAILS_REQUEST', updateUserAsync);
}
