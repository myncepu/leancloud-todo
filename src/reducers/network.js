import { CHANGE_CONNECTION_STATUS } from '../actions/network'

const initialState = {
  connectionInfo: null,
  hasCheckedStatus: false,
}

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CONNECTION_STATUS:
      return {
        ...state,
        connectionInfo: action.connectionInfo,
        hasCheckedStatus: true,
      }
    default:
      return state
  }
}

export default networkReducer
