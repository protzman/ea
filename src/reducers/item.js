import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE
} from '../actions'

export default function item(state = {
  items: {},
  response: {},
  fetching: false,
  posting: false,
  error: false
}, action) {
  const { type, response, error } = action
  switch (type) {
    case FETCH_ITEMS_REQUEST:
      return { ...state, fetching: true, error: null }
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state, fetching: false, items: response, error: null
      }
    case FETCH_ITEMS_FAILURE:
      return {
        ...state, fetching: false, items: null, error
      }
    default:
      return state
  }
}
