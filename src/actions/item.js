import { makeActionCreator } from '../utils'

export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST'
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS'
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE'

export const fetchItemsRequest = makeActionCreator(FETCH_ITEMS_REQUEST)
export const fetchItemsSuccess = makeActionCreator(FETCH_ITEMS_SUCCESS, 'response')
export const fetchItemsFailure = makeActionCreator(FETCH_ITEMS_FAILURE, 'error')

export const FETCH_ITEM_REQUEST = 'FETCH_ITEM_REQUEST'
export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS'
export const FETCH_ITEM_FAILURE = 'FETCH_ITEM_FAILURE'

export const fetchItemRequest = makeActionCreator(FETCH_ITEM_REQUEST, 'id')
export const fetchItemSuccess = makeActionCreator(FETCH_ITEM_SUCCESS, 'id', 'response')
export const fetchItemFailure = makeActionCreator(FETCH_ITEM_FAILURE, 'id', 'error')

export const POST_ITEM_REQUEST = 'POST_ITEM_REQUEST'
export const POST_ITEM_SUCCESS = 'POST_ITEM_SUCCESS'
export const POST_ITEM_FAILURE = 'POST_ITEM_FAILURE'

export const postItemRequest = makeActionCreator(POST_ITEM_REQUEST, 'body')
export const postItemSuccess = makeActionCreator(POST_ITEM_SUCCESS, 'body', 'response')
export const postItemFailure = makeActionCreator(POST_ITEM_FAILURE, 'body', 'error')

export const PUT_ITEM_REQUEST = 'PUT_ITEM_REQUEST'
export const PUT_ITEM_SUCCESS = 'PUT_ITEM_SUCCESS'
export const PUT_ITEM_FAILURE = 'PUT_ITEM_FAILURE'

export const putItemRequest = makeActionCreator(PUT_ITEM_REQUEST, 'body')
export const putItemSuccess = makeActionCreator(PUT_ITEM_SUCCESS, 'body', 'response')
export const putItemFailure = makeActionCreator(PUT_ITEM_FAILURE, 'body', 'error')

export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST'
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS'
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE'

export const deleteItemRequest = makeActionCreator(DELETE_ITEM_REQUEST, 'body')
export const deleteItemSuccess = makeActionCreator(DELETE_ITEM_SUCCESS, 'body', 'response')
export const deleteItemFailure = makeActionCreator(DELETE_ITEM_FAILURE, 'body', 'error')


// * we are using 'body' in here becasue whatever the string in here is set as,
// * is what the item (object) is wrapped in when sent to the action creator.
// * 'body' just happens to be what the API accepts so this is essentially wrapping it

