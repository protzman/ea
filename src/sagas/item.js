import { put, call, takeEvery } from 'redux-saga/effects'
import { API } from 'aws-amplify'
import {
  FETCH_ITEMS_REQUEST,
  fetchItemsFailure,
  postItemFailure,
  POST_ITEM_REQUEST,
  fetchItemsSuccess,
  putItemFailure,
  putItemSuccess,
  postItemSuccess,
  PUT_ITEM_REQUEST,
  deleteItemFailure,
  deleteItemSuccess,
  DELETE_ITEM_REQUEST
} from '../actions'

const api = `itemsCRUD`


function* fetchItems() {
  const path = `/items`
  console.log('fetching items')
  try {
    const items = yield API.get(api, path).then(response => response.data)
    yield put(fetchItemsSuccess(items))
  } catch (error) {
    console.log('error:', error)
    yield put(fetchItemsFailure(error.message))
  }
}

function* postItem(item) {
  const path = `/items`
  console.log('posting item')
  try {
    const res = yield API.post(api, path, item).then(response => response.data)
    yield put(postItemSuccess(item, res))
    // ! might be unnecessary to call this fetchItems below. might be better
    // ! to just add the 200ok response to the store vs wasting another call TODO
    yield call(fetchItems)
  } catch (error) {
    console.log('error:', error)
    yield put(postItemFailure(error.message))
  }
}

function* putItem(item) {
  const path = `/items`
  console.log('putting item')
  try {
    const res = yield API.put(api, path, item).then(response => response.data)
    yield put(putItemSuccess(item, res))
    yield call(fetchItems)
  } catch (error) {
    console.log('error:', error)
    yield put(putItemFailure(item, error.message))
  }
}

function* deleteItem(item) {
  const path = `/items/object/${item.id}`
  console.log('deleting item')
  try {
    const res = yield API.del(api, path).then(response => response.data)
    yield put(deleteItemSuccess(item.id, res))
    yield call(fetchItems)
  } catch (error) {
    console.log('error:', error)
    yield put(deleteItemFailure(item.id, error.message))
  }
}

// * watcher functions * //

export function* fetchItemsRequestWatcher() {
  yield takeEvery(FETCH_ITEMS_REQUEST, fetchItems)
}

export function* postItemRequestWatcher() {
  yield takeEvery(POST_ITEM_REQUEST, postItem)
}

export function* putItemRequestWatcher() {
  yield takeEvery(PUT_ITEM_REQUEST, putItem)
}

export function* deleteItemRequestWatcher() {
  yield takeEvery(DELETE_ITEM_REQUEST, deleteItem)
}
