import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchAllLists } from '../services/task.project';

import { fetchAllListsSuccess, fetchAllListsFailure } from '../actions';

function* fetchAllListsAsync() {
  try {
    let lists = yield call(fetchAllLists);

    yield put(fetchAllListsSuccess(lists));
  } catch (error) {
    yield put(fetchAllListsFailure(error.message));
  }
}

export function* watchFetchAllLists() {
  yield takeEvery('FETCH_ALL_LISTS_REQUEST', fetchAllListsAsync);
}
