import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchAllCards } from '../services/task.project';

import { fetchAllCardsSuccess, fetchAllCardsFailure } from '../actions';

function* fetchAllCardsAsync() {
  try {
    let cards = yield call(fetchAllCards);
    console.log('cards', cards);

    yield put(fetchAllCardsSuccess(cards));
  } catch (error) {
    yield put(fetchAllCardsFailure(error.message));
  }
}

export function* watchFetchAllCards() {
  yield takeEvery('FETCH_ALL_CARDS_REQUEST', fetchAllCardsAsync);
}
