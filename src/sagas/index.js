import { all, fork } from 'redux-saga/effects'
import { watchFetchUserRequest } from './user'
import {
  fetchItemsRequestWatcher,
  postItemRequestWatcher,
  putItemRequestWatcher,
  deleteItemRequestWatcher
} from './item'
import { postMetricRequestWatcher } from './metric'

function* clientSagas() {
  yield all([
    fork(watchFetchUserRequest),
    fork(fetchItemsRequestWatcher),
    fork(postItemRequestWatcher),
    fork(putItemRequestWatcher),
    fork(deleteItemRequestWatcher),
    // fork(watchPostUserRequest),
    fork(postMetricRequestWatcher)
  ])
}

export default function* mainSaga() {
  yield all([
    fork(clientSagas)
  ])
}
