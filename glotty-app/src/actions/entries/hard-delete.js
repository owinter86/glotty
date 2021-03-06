import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const ENTRIES_HARD_DELETED = 'ENTRIES_HARD_DELETED'

const api = new API()

export default () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    dispatch({ type: LOAD_SUCCESS })
    const backend = api.service('entries')
    api.app.authenticate()
    .then(() => {
      backend.find({ query: { deleted: true }})
        .then((result) => {
          result.data.map((r) => (
            backend.remove(r._id)
            .then((result) => {
              dispatch({ type: APP_DONE_LOADING })
              dispatch({ type: LOAD_SUCCESS })
              dispatch({
                type: ENTRIES_HARD_DELETED,
              })
            })
          ))
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
