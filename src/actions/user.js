export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT = 'LOGOUT'
export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'

export const loginRequest = (username, password) => ({
  type: LOGIN_REQUEST,
  username,
  password,
})

export const logOut = () => ({
  type: LOGOUT,
})

export const registerRequest = (username, password) => ({
  type: REGISTER_REQUEST,
  username,
  password,
})
