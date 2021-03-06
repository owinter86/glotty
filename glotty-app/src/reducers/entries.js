import { FETCHED_ENTRIES } from '../actions/entries/fetch'
import { PLATFORM_DELETED } from '../actions/platforms/delete'
import { KEY_EDITED } from '../actions/platforms/edit-key'
import { ADDED_PLATFORM } from '../actions/platforms/add'
import { TRANSLATION_UPDATED } from '../actions/translations/update'

import {
  ENTRY_CREATED,
  ENTRY_UPDATED,
  ENTRY_DELETED,
  ENTRY_REVIVED,
  ENTRIES_HARD_DELETED,
} from '../actions/entries/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_ENTRIES :
      return [ ...payload ]

    case ENTRY_CREATED :
      const newEntry = { ...payload }
      return state.concat([newEntry])

    case ADDED_PLATFORM :
    case TRANSLATION_UPDATED :
    case KEY_EDITED :
    case ENTRY_DELETED :
    case ENTRY_REVIVED :
    case ENTRY_UPDATED :
      return state.map((entry) => {
        if (entry._id === payload._id) {
          return { ...payload }
        }
        return entry
      })

    case ENTRIES_HARD_DELETED :
      return state.filter((entry) => (entry.deleted !== true))

    case PLATFORM_DELETED:
      return state.map((entry) => {
        if (entry._id === payload._id) {
          return { ...payload }
        }
        return entry
      })

    default :
      return state

  }
}
