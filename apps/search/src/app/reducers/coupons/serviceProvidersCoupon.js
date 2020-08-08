import {POST_SEND_COUPON, FULFILLED, REJECTED, PENDING} from '../../constants/ActionTypes'

const initialState = {data: {}, status: null}

export default (state = initialState, action)  => {
  switch (action.type) {
    case POST_SEND_COUPON + FULFILLED : {
      const data = action.payload.data
      if (action.payload.responseCode > 0) {
        return Object.assign({}, state, {data, status: REJECTED})
      } 
      return Object.assign({}, state, {data, status: FULFILLED})
    }
    case POST_SEND_COUPON + PENDING : {
      return {data: {}, status: PENDING}
    }
    case POST_SEND_COUPON:
      return {data: {}}
    default:
      return state
  }
}