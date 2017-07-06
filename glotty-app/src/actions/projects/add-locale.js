import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
 } from '../loading'
import { FETCHED_ENTRIES } from '../entries/fetch'

export const ADDED_LOCALE = 'ADDED_LOCALE'

const api = new API()

export default (projectId, data) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    dispatch({ type: LOAD_SUCCESS })
    const backend = api.service('projects')
    backend.patch(projectId, data)
      .then((result) => {
        dispatch({
          type: ADDED_LOCALE,
          payload: result
        })
        api.service('entries').find({ query: { projectId: result._id } })
          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })
            dispatch({
              type: FETCHED_ENTRIES,
              payload: result.data
            })
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
