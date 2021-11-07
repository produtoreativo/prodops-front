import axios from 'axios';
import { push } from "connected-react-router";
import { Action } from "redux";
import { takeLatest, put } from "redux-saga/effects";
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
})

interface MetaAction extends Action {
  meta: any
}

function * prepare(action: MetaAction) {
  try {
    const { data: payload } = yield instance.get('/search');
    yield put({
      type: 'SUCCESS',
      payload,
      meta: action.meta,
    })
  } catch (payload) {
    yield put({
      type: 'GLOBAL_ERROR',
      payload,
    })
  }

}

export default function* watchSave() {
  yield takeLatest("ASSESSMENT_SAVE_STEP", prepare)
}