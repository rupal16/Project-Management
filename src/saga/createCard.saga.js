import { put, call, takeEvery } from 'redux-saga/effects';
import { createCard } from '../services/task.project';

import { addCardSuccess, addCardFailure } from '../actions';

function* createCardAsync({ payload }) {
  try {
    yield call(createCard(payload.payload.title));

    yield put(addCardSuccess, payload.title);
  } catch (error) {
    yield put(addCardFailure(error.message));
  }
}

export function* watchCreateCard() {
  yield takeEvery('ADD_CARD_REQUEST', createCardAsync);
}
