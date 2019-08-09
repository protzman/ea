import { combineReducers } from 'redux'
import user from './user'
import item from './item'
import metric from './metric'

export default combineReducers({ user, item, metric })
