import { APP_ERROR } from '../constants/ActionTypes'

export function error(err) {
  return {
    type: APP_ERROR,
    message: err
  }
}
