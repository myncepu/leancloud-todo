import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/user'

const initialState = {
  logined: false,
  logining: false,
  error: null,
  info: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        logining: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        logined: true,
        logining: false,
        error: null,
        info: action.result,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        logined: false,
        logining: false,
        error: action.errorMessage,
      }
    default:
      return state
  }
}

export default userReducer
