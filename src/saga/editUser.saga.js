import { put, call, takeEvery } from 'redux-saga/effects';
import { userUpdate } from '../services/user-service';

import { editUserDetailsFailure, editUserDetailsSuccess } from '../actions';

function* updateUserAsync({ firstName, lastName, email, phone }) {
  try {
    const userData = yield call(userUpdate(firstName, lastName, email, phone));
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
