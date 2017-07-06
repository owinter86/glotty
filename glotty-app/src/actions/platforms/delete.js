import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import { FETCHED_ENTRIES } from '../entries/fetch'

export const PLATFORM_DELETED = 'PLATFORM_DELETED'

const api = new API()

export default (entryId, data) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    dispatch({ type: LOAD_SUCCESS })
    const backend = api.service('entries')
    console.log(entryId)
    backend.patch(entryId, data)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({
          type: PLATFORM_DELETED,
          payload: result
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
           type: LOAD_ERROR,
           payload: error.message
        })
      })
  }
}