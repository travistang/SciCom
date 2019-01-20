import { put, call, takeLatest } from 'redux-saga/effects'
import { serverURL } from '../constants'
import { postJSON } from '../utils/requests'
import { authorizedRequestGet } from '../utils/requests'
import * as LoginActions from '../actions/auth'

export function* getUser() {
  const user = yield call(authorizedRequestGet, `${serverURL}/user`)
  return user
}

export function* login({ username, password }) {
  const payload = {username, password}
  const response = yield postJSON(`${serverURL}/auth/login`, payload)
  const { error, token } = response
  console.log("got token ", token)
  if(error) {
    yield put({
      type: LoginActions.SET_AUTH_ERROR,
      error
    })
  } else {
    yield put({
      type: LoginActions.SET_TOKEN,
      token
    })
    const user = yield call(getUser)
    yield put({
      type: LoginActions.SET_USER,
      user
    })
  }
}

export function* register({ username, password, email, isPolitician}) {
  const payload = { username, password, email, isPolitician }
  const response = yield postJSON(`${serverURL}/auth/register`, payload)
  const { error, token } = response
  if(error) {
    yield put({
      type: LoginActions.SET_AUTH_ERROR,
      error
    })
  } else {
    yield put({
      type: LoginActions.SET_TOKEN,
      token
    })
    const user = yield call(getUser)
    yield put({
      type: LoginActions.SET_USER,
      user
    })
  }
}

// watchers
export function* watchLogin() {
  yield takeLatest(LoginActions.LOGIN, login)
}

export function* watchRegister() {
  yield takeLatest(LoginActions.REGISTER, register)
}
