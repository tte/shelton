import { SORT_BY_TYPE } from '../constants/ActionTypes'
// export const APP_ERROR = 'APP_ERROR'

// export function error(err) {
//   return {
//     type: APP_ERROR,
//     params: err
//   }
// }

export function sortByType(type) {
  return {
    type: SORT_BY_TYPE,
    sortType: type
  }
}