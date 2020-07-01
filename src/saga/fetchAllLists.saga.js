import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchAllLists } from '../services/task.project';

import { fetchAllListsSuccess, fetchAllListsFailure } from '../actions';

function* fetchAllListsAsync({ payload }) {
  try {
    let response = yield call(fetchAllLists, payload.projectId);
    console.log('response', response);

    yield put(fetchAllListsSuccess(response.sortedListArray));
  } catch (error) {
    yield put(fetchAllListsFailure(error.message));
  }
}

export function* watchFetchAllLists() {
  yield takeEvery('FETCH_ALL_LISTS_REQUEST', fetchAllListsAsync);
}
