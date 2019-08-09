import { makeActionCreator } from '../utils'

export const FETCH_METRIC_REQUEST = 'FETCH_METRIC_REQUEST'
export const FETCH_METRIC_SUCCESS = 'FETCH_METRIC_SUCCESS'
export const FETCH_METRIC_FAILURE = 'FETCH_METRIC_FAILURE'

export const fetchMetricRequest = makeActionCreator(FETCH_METRIC_REQUEST, 'id')
export const fetchMetricSuccess = makeActionCreator(FETCH_METRIC_SUCCESS, 'id', 'response')
export const fetchMetricFailure = makeActionCreator(FETCH_METRIC_SUCCESS, 'id', 'error')

export const POST_METRIC_REQUEST = 'POST_METRIC_REQUEST'
export const POST_METRIC_SUCCESS = 'POST_METRIC_SUCCESS'
export const POST_METRIC_FAILURE = 'POST_METRIC_FAILURE'

export const postMetricRequest = makeActionCreator(POST_METRIC_REQUEST, 'payload')
export const postMetricSuccess = makeActionCreator(POST_METRIC_SUCCESS, 'payload', 'response')
export const postMetricFailure = makeActionCreator(POST_METRIC_SUCCESS, 'payload', 'error')

export const PUT_METRIC_REQUEST = 'PUT_METRIC_REQUEST'
export const PUT_METRIC_SUCCESS = 'PUT_METRIC_SUCCESS'
export const PUT_METRIC_FAILURE = 'PUT_METRIC_FAILURE'

export const putMetricRequest = makeActionCreator(PUT_METRIC_REQUEST, 'metric')
export const putMetricSuccess = makeActionCreator(PUT_METRIC_SUCCESS, 'metric', 'response')
export const putMetricFailure = makeActionCreator(PUT_METRIC_SUCCESS, 'metric', 'error')

export const DELETE_METRIC_REQUEST = 'DELETE_METRIC_REQUEST'
export const DELETE_METRIC_SUCCESS = 'DELETE_METRIC_SUCCESS'
export const DELETE_METRIC_FAILURE = 'DELETE_METRIC_FAILURE'

export const deleteMetricRequest = makeActionCreator(DELETE_METRIC_REQUEST, 'id')
export const deleteMetricSuccess = makeActionCreator(DELETE_METRIC_SUCCESS, 'id', 'response')
export const deleteMetricFailure = makeActionCreator(DELETE_METRIC_SUCCESS, 'id', 'error')

export const TOGGLE_METRIC = 'TOGGLE_METRIC'

export const toggleMetric = makeActionCreator(TOGGLE_METRIC)
