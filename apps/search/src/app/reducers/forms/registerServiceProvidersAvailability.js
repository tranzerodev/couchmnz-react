import {REGISTER_SERVICE_PROVIDERS_AVAILABILITY, FULFILLED, REJECTED, PENDING} from '../../constants/ActionTypes'

const initialState = {data: {}, status: null}

export default (state = initialState, action)  => {
  switch (action.type) {
    case REGISTER_SERVICE_PROVIDERS_AVAILABILITY + FULFILLED : {
      const data = action.payload.data
      if (action.payload.responseCode > 0) {
        return Object.assign({}, state, {data, status: REJECTED})
      } 
      return Object.assign({}, state, {data, status: FULFILLED})
    }
    case REGISTER_SERVICE_PROVIDERS_AVAILABILITY + PENDING : {
      return {data: {}, status: PENDING}
    }
    case REGISTER_SERVICE_PROVIDERS_AVAILABILITY:
      return {data: {}}
    default:
      return state
  }
}
