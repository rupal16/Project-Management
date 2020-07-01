import { put, call, takeEvery } from 'redux-saga/effects';
import { createCard } from '../services/task.project';

import { addCardSuccess, addCardFailure } from '../actions';

function* createCardAsync({ payload }) {
  try {
    console.log('payload form create card', payload);
    const cardId = yield call(createCard, payload.text, payload.listId);
    console.log('card id from saga', cardId);

    yield put(
      addCardSuccess(
        payload.text,
        payload.listId,
        cardId.path.pieces_[cardId.path.pieces_.length - 1],
      ),
    );
  } catch (error) {
    yield put(addCardFailure(error.message));
  }
}

export function* watchCreateCard() {
  yield takeEvery('ADD_CARD_REQUEST', createCardAsync);
}
