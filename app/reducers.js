import {
  REQUEST_FEED_PHOTOS,
  RECEIVE_FEED_PHOTOS,
  SORT_BY_TYPE,
  RECEIVE_PHOTO_SIZE,
  PICK_PHOTO_SIZE,
  CHANGE_VIEW_TYPE,
  APP_ERROR } from './constants/ActionTypes'
import { SORT_DEFAULT, PICK_SIZE_DEFAULT, VIEW_DEFAULT } from './constants/FilterTypes'


export function app(state = { error: false }, action) {
  switch(action.type) {
    case APP_ERROR:
      return Object.assign({}, state, { error: true, message: action.message})
    default:
      return state
  }
}

export function filter(state = { sortType: SORT_DEFAULT, pickedSize: PICK_SIZE_DEFAULT, viewType: VIEW_DEFAULT }, action) {
  switch(action.type) {
    case SORT_BY_TYPE:
      return Object.assign({}, state, { sortType: action.sortType })
    case PICK_PHOTO_SIZE:
      return Object.assign({}, state, { pickedSize: action.size })
    case CHANGE_VIEW_TYPE:
      return Object.assign({}, state, { viewType: action.view })
    default:
      return state
  }
}

export function photo(state = { items: [], isFetching: false }, action) {
  switch(action.type) {
    case REQUEST_FEED_PHOTOS:
      return Object.assign({}, state, { isFetching: true })
    case RECEIVE_FEED_PHOTOS:
      return Object.assign({}, state, { items: action.items, isFetching: false })
    case RECEIVE_PHOTO_SIZE:
      let items = state.items.map(item => (item.photo_id == action.item.photo_id) ? action.item : item)
      return Object.assign({}, state, { items: items })
    default:
      return state
  }
}

export default {
  app: app,
  filter: filter,
  photo: photo
}