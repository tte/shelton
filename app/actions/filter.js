import { SORT_BY_TYPE, PICK_PHOTO_SIZE, CHANGE_VIEW_TYPE } from '../constants/ActionTypes'

export function sortByType(type) {
  return {
    type: SORT_BY_TYPE,
    sortType: type
  }
}

export function pickPhotoSize(size) {
  return {
    type: PICK_PHOTO_SIZE,
    size: size
  }
}

export function changeViewType(view) {
  return {
    type: CHANGE_VIEW_TYPE,
    view: view
  }
}
