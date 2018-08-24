import { CHANGE_CONNECTION_STATUS } from '../actions/network'

const isConnected = (status) => {
  if (status.toLowerCase() === 'none') {
    return false
  }
  return true
}

const initialState = {
  connectionInfo: null,
  hasCheckedStatus: false,
  isConnected: false,
}

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CONNECTION_STATUS:
      return {
        ...state,
        connectionInfo: action.connectionInfo,
        isConnected: isConnected(action.connectionInfo.type),
        hasCheckedStatus: true,
      }
    default:
      return state
  }
}

export default networkReducer
