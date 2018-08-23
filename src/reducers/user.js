import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/user'

const initialState = {
  logined: false,
  logining: false,
  registered: false,
  error: null,
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
        registered: true,
        error: null,
        userInfo: action.userInfo,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        logining: false,
        error: action.errorMessage,
      }
    case REGISTER_REQUEST:
      return {
        ...state,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        registered: true,
        error: null,
        userInfo: action.userInfo,
      }
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.errorMessage,
      }
    default:
      return state
  }
}

export default userReducer
