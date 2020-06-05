import { all } from 'redux-saga/effects';

import { watchFetchUser } from './fetchUser.saga';
import { watchEditUser } from './editUser.saga';

// const sagas = [watchFetchUser, ...watchEditUser];

export function* rootSaga() {
  yield all([watchFetchUser(), watchEditUser()]);
  // code after all-effect
}
