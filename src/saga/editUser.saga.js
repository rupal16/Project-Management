import { put, call, takeEvery } from 'redux-saga/effects';
import { userUpdate } from '../services/user-service';

import { editUserDetailsFailure, editUserDetailsSuccess } from '../actions';

function* updateUserAsync({ firstName, lastName, email, phone }) {
  try {
    console.log('inside update saga');
    console.log('firstname from saga', firstName);
    const userData = yield call(userUpdate(firstName, lastName, email, phone));
    yield put(
      editUserDetailsSuccess(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.phone,
      ),
    );

    console.log('data', userData);
  } catch (error) {
    yield put(editUserDetailsFailure(error.message));
  }
}

export function* watchEditUser() {
  console.log('watcher edit user');
  yield takeEvery('EDIT_USER_DETAILS_REQUEST', updateUserAsync);
}
