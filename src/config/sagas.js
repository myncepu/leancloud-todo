import { takeEvery, put } from 'redux-saga/effects'
import { User } from 'leancloud-storage'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/user'

function* login(action) {
  try {
    const username = action.username
    const password = action.password
    const response = yield User.logIn(username, password)
    yield put({ type: LOGIN_SUCCESS, result: response })
  } catch(e) {
    yield put({ type: LOGIN_FAIL, errorMessage: e.message })
  }
}

export default function* rootSaga() {
  yield takeEvery(LOGIN_REQUEST, login)
}
