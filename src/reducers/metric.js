import {
  FETCH_METRIC_REQUEST,
  FETCH_METRIC_SUCCESS,
  FETCH_METRIC_FAILURE,
  POST_METRIC_REQUEST,
  POST_METRIC_SUCCESS,
  POST_METRIC_FAILURE,
  TOGGLE_METRIC
} from '../actions'

export default function metric(state = {
  metrics: {},
  response: {},
  fetching: false,
  posting: false,
  error: false
}, action) {
  const { type, response, error } = action
  switch (type) {
    case FETCH_METRIC_REQUEST:
      return { ...state, fetching: true, error: null }
    case FETCH_METRIC_SUCCESS:
      return {
        ...state, fetching: false, metrics: response, error: null
      }
    case FETCH_METRIC_FAILURE:
      return {
        ...state, fetching: false, metrics: null, error
      }
    case POST_METRIC_REQUEST:
      return { ...state, posting: true, error: null }
    case POST_METRIC_SUCCESS:
      return {
        ...state, posting: false, metrics: [...state.metrics, response], error: null
      }
    case POST_METRIC_FAILURE:
      return {
        ...state, posting: false, response: null, error
      }
    case TOGGLE_METRIC:
      return {
        ...state,
      }
    default:
      return state
  }
}
