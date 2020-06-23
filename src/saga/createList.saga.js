import { put, call, takeEvery } from 'redux-saga/effects';
import { createList } from '../services/task.project';

import { addListSuccess, addListFailure } from '../actions';

function* createListAsync({ payload }) {
  try {
    yield call(createList(payload.title));

    yield put(addListSuccess, payload.title);
  } catch (error) {
    yield put(addListFailure(error.message));
  }
}

export function* watchCreateList() {
  yield takeEvery('ADD_LIST_REQUEST', createListAsync);
}
