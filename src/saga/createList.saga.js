import { put, call, takeEvery } from 'redux-saga/effects';
import { createList } from '../services/task.project';

import { addListSuccess, addListFailure } from '../actions';

function* createListAsync({ payload }) {
  try {
    const a = yield call(createList, payload.title, payload.projectId);
    console.log('listref', a.path);
    yield put(
      addListSuccess(
        payload.title,
        payload.projectId,
        a.path.pieces_[a.path.pieces_.length - 1],
      ),
    );
  } catch (error) {
    yield put(addListFailure(error.message));
  }
}

export function* watchCreateList() {
  yield takeEvery('ADD_LIST_REQUEST', createListAsync);
}
