import { put, call, takeEvery } from 'redux-saga/effects';
import { createList } from '../services/task.project';

import { addListSuccess, addListFailure } from '../actions';

function* createListAsync({ payload }) {
  try {
    console.log('payload', payload);
    const response = yield call(createList, payload.title, payload.projectId);
    console.log('listref', response);
    yield put(
      addListSuccess(response.title, response.projectId, response.listId),
    );
  } catch (error) {
    yield put(addListFailure(error.message));
  }
}

export function* watchCreateList() {
  yield takeEvery('ADD_LIST_REQUEST', createListAsync);
}
