import {AVAILABLE_SPORTS_LIST, FULFILLED, REJECTED, PENDING} from '../constants/ActionTypes'

const initialState = {data: {}, status: null}

export default function availableSportsList(state = initialState, action) {
  switch (action.type) {
    case AVAILABLE_SPORTS_LIST + FULFILLED : {
      const { data } = action.payload
      if (action.payload.responseCode > 0) {
        return Object.assign({}, state, {data: {}, status: REJECTED})
      } 
      return Object.assign({}, state, {data, status: FULFILLED})
    }
    case AVAILABLE_SPORTS_LIST + PENDING : {
      return {data: {}, status: PENDING}
    }
    case AVAILABLE_SPORTS_LIST:
      return {data: {}}
    default:
      return state
  }
}
