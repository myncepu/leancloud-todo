import { takeEvery, put } from 'redux-saga/effects'
import { User } from 'leancloud-storage'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/user'
import {
  TODO_FETCH_ALL,
  fetchAllGenerator,
  TODO_CREATE,
  createTodoGenerator,
  TODO_TOGGLE,
  toggleTodoGenerator,
} from '../actions/todos'

function* login(action) {
  try {
    const username = action.username
    const password = action.password
    const response = yield User.logIn(username, password)
    const userInfo = {
      ...response.attributes,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      sessionToken: response._sessionToken,
    }
    yield put({ type: LOGIN_SUCCESS, userInfo: userInfo })
  } catch(e) {
    yield put({ type: LOGIN_FAIL, errorMessage: e.message })
  }
}

function* register(action) {
  try {
    const username = action.username
    const password = action.password
    const user = new User()
    user.setUsername(username)
    user.setPassword(password)
    const response = yield user.signUp()
    const userInfo = {
      ...response.attributes,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    }
    yield put({ type: REGISTER_SUCCESS, userInfo })
  } catch(e) {
    yield put({ type: REGISTER_FAIL, errorMessage: e.message })
  }
}

export default function* rootSaga() {
  yield takeEvery(LOGIN_REQUEST, login)
  yield takeEvery(REGISTER_REQUEST, register)
  yield takeEvery(TODO_FETCH_ALL, fetchAllGenerator)
  yield takeEvery(TODO_CREATE, createTodoGenerator)
  yield takeEvery(TODO_TOGGLE, toggleTodoGenerator)
}
