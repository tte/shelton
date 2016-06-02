// import { combineReducers } from 'redux'
import { REQUEST_FEED_PHOTOS, RECEIVE_FEED_PHOTOS, SORT_BY_TYPE, RECEIVE_PHOTO_SIZE, PICK_PHOTO_SIZE } from './constants/ActionTypes'
import { SORT_DEFAULT, SORT_BY_NAME_ASC, PICK_SIZE_DEFAULT } from './constants/FilterTypes' // TODO remove SORT_BY_NAME_ASC - test


export function app(state = { error: false }, action) {
  switch(action.type) {
    default:
      return state
  }
}

export function photo(state = { items: [], isFetching: false, sortType: SORT_BY_NAME_ASC, pickedSize: PICK_SIZE_DEFAULT }, action) {
  switch(action.type) {
    case REQUEST_FEED_PHOTOS:
      return Object.assign({}, state, { isFetching: true })
    case RECEIVE_FEED_PHOTOS:
      return Object.assign({}, state, { items: action.items, isFetching: false })
    case SORT_BY_TYPE:
      return Object.assign({}, state, { sortType: action.sortType })
    case RECEIVE_PHOTO_SIZE:
      let items = state.items.map(item => (item.photo_id == action.item.photo_id) ? action.item : item)
      return Object.assign({}, state, { items: items })
    case PICK_PHOTO_SIZE:
      return Object.assign({}, state, { pickedSize: action.size })
    default:
      return state
  }
}

// export default combineReducers({
//   app: app,
//   photo: photo
// })

export default {
  app: app,
  photo: photo
}