import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/user'

const initialState = {
  logined: false,
  error: null,
  userInfo: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        logined: true,
        error: null,
        userInfo: action.userInfo,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.errorMessage,
      }
    case LOGOUT:
      return {
        ...state,
        ...initialState,
      }
    case REGISTER_REQUEST:
      return {
        ...state,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
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
