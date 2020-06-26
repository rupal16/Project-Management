import { put, call, takeEvery } from 'redux-saga/effects';
import { updateListTitle } from '../services/task.project';

import { updateListTitleSuccess, updateListTitleFailure } from '../actions';

function* updateListTitleAsync({ payload }) {
  console.log('update saga', payload);
  try {
    const res = yield call(updateListTitle, payload.listId, payload.title);
    console.log('res', res);

    yield put(updateListTitleSuccess(payload.listId, payload.title));
  } catch (error) {
    yield put(updateListTitleFailure(error.message));
  }
}

export function* watchUpdateListTitle() {
  yield takeEvery('UPDATE_LIST_TITLE_REQUEST', updateListTitleAsync);
}
