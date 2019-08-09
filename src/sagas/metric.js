import { put, takeEvery } from 'redux-saga/effects'

import {
  POST_METRIC_REQUEST,
  postMetricSuccess,
  postMetricFailure,
} from '../actions'

function* postMetric(metric) {
  console.log('saga: post metric')
  try {
    yield put(postMetricSuccess(metric, metric.payload))
  } catch (error) {
    yield put(postMetricFailure(metric, 'failed to post metric'))
  }
}

// * watcher functions * //

export function* postMetricRequestWatcher() {
  yield takeEvery(POST_METRIC_REQUEST, postMetric)
}
